# Guia de Conexão: API Flask no WSL 2 com App React Native (Expo)

Este guia detalha os passos necessários para conectar um aplicativo React Native, rodando com **Expo Go em um dispositivo físico**, a uma API Flask (ou qualquer outra) que está sendo executada dentro do **WSL 2 (Windows Subsystem for Linux)**.

O objetivo é resolver problemas de conectividade, como o comum erro `Network request failed`, que ocorrem devido à arquitetura de rede específica do WSL 2.

## Cenário Principal: API no WSL 2 e App no Expo Go

Siga estes passos se você está desenvolvendo com sua API no WSL e testando seu app em um celular físico.

### Pré-requisitos

* Sua API Flask já está funcional dentro do ambiente WSL.
* Seu computador (host Windows) e seu celular (com Expo Go) estão conectados na **mesma rede Wi-Fi**.
* Sua API Flask está configurada para rodar no host correto (ver Passo 4).

### Passo 1: Encontrando os Endereços de IP (Host e WSL)

Precisamos de dois endereços de IP: o da sua máquina Windows na rede local e o da sua máquina virtual WSL.

1. **Obter o IP do Windows (Host):**
    * No Windows, abra o **PowerShell** ou **CMD**.
    * Execute o comando:

        ```bash
        ipconfig
        ```
  
    * Anote o **"Endereço IPv4"** do seu adaptador Wi-Fi. (Ex: `192.168.1.147`).

2. **Obter o IP do WSL (Guest):**
    * Abra o seu terminal do WSL (Ubuntu, Debian, etc.).
    * Execute o comando:

        ```bash
        hostname -I
        ```
  
    * Anote o endereço de IP que será exibido. (Ex: `172.25.123.45`).

### Passo 2: Configurando o Redirecionamento de Porta (Port Forwarding)

Vamos criar uma regra no Windows para que todo o tráfego que chega em uma porta específica seja encaminhado para a mesma porta na sua máquina WSL.

1. Abra o **PowerShell** ou **CMD** **como Administrador**. (Isto é obrigatório).
2. Execute o seguinte comando, substituindo os valores de exemplo pelos seus IPs e porta:

    ```powershell
    netsh interface portproxy add v4tov4 listenport=5000 listenaddress=192.168.1.147 connectport=5000 connectaddress=172.25.123.45
    ```
  
    * `listenport`: A porta da sua API (ex: `5000`).
    * `listenaddress`: O IP do seu **Windows** (Passo 1.1).
    * `connectport`: A mesma porta, onde a API escuta dentro do WSL.
    * `connectaddress`: O IP da sua máquina **WSL** (Passo 1.2).

### Passo 3: Liberando a Porta no Firewall do Windows

Mesmo com o redirecionamento, o Firewall do Windows pode bloquear a conexão. Precisamos criar uma regra de entrada.

1. No menu Iniciar, pesquise por `Firewall do Windows Defender` e abra-o.
2. No menu à esquerda, clique em `Configurações avançadas`.
3. Selecione `Regras de Entrada` e, no painel direito, clique em `Nova Regra...`.
4. Selecione `Porta` e avance.
5. Selecione `TCP` e em "Portas locais específicas", digite a porta da sua API (ex: `5000`).
6. Avance e selecione `Permitir a conexão`.
7. Mantenha as três opções (Domínio, Particular, Pública) marcadas, dê um nome à regra (ex: `API Flask WSL`) e conclua.

### Passo 4: Configurando a API Flask

Para que sua API dentro do WSL aceite a conexão encaminhada pelo Windows, ela precisa "escutar" em todas as interfaces de rede.

No seu código Python, garanta que o `app.run` esteja configurado com `host='0.0.0.0'`.

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### Passo 5: Configurando a URL da API no Projeto Expo

A melhor prática é usar variáveis de ambiente para gerenciar a URL da API.

1. Na raiz do seu projeto React Native, crie um arquivo chamado `.env`.
2. Adicione a seguinte linha ao arquivo, usando o **IP do seu Windows**:

    ```.env
    EXPO_PUBLIC_API_URL=[http://192.168.1.147:5000/api](http://192.168.1.147:5000/api)
    ```
  
3. No seu código, você pode acessar essa variável de ambiente da seguinte forma:

    ```javascript
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    // Exemplo de uso
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .catch(error => console.error(error));
    ```

## Cenário Alternativo: Conectando via Emulador Android

Se você estiver usando um Emulador Android oficial em vez de um dispositivo físico, o processo é **muito mais simples**. O emulador possui um endereço de IP especial que funciona como um "apelido" para o `localhost` do seu computador host (Windows).

Neste caso, **você NÃO precisa dos passos de redirecionamento de porta (`netsh`) nem da regra de firewall**.

Basta alterar a variável de ambiente no seu arquivo `.env`:

1. Abra o arquivo `.env`.
2. Mude a URL para usar o IP especial `10.0.2.2`:

    ```.env
    EXPO_PUBLIC_API_URL=[http://10.0.2.2:5000/api](http://10.0.2.2:5000/api)
    ```
  
3. Reinicie seu servidor de desenvolvimento para que o Expo carregue a nova variável de ambiente.

## Solução de Problemas (Troubleshooting)

### Erro "Network request failed" persiste?

Se mesmo após seguir os passos o erro continuar, tente o seguinte:

1. **Limpar o Cache do Expo:** Pare o servidor de desenvolvimento (`Ctrl+C`) e reinicie-o com o seguinte comando. Isso resolve problemas de cache que podem manter configurações antigas.

    ```bash
    npx expo start -c
    ```
  
2. **Verificar o `app.json` (Android):** Garanta que seu app permite tráfego não criptografado em desenvolvimento, adicionando a seguinte chave em `app.json`:

    ```json
    {
      "expo": {
        "android": {
          "usesCleartextTraffic": true
        }
      }
    }
    ```

#### Como gerenciar as regras de redirecionamento?

* **Para ver todas as regras de portproxy ativas:**

    ```powershell
    netsh interface portproxy show all
    ```
  
* **Para deletar a regra que você criou:**

    ```powershell
    netsh interface portproxy delete v4tov4 listenport=5000 listenaddress=192.168.1.147
  