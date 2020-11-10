# Lgmt-SNCT-PupBot

Este é um projeto que criado para utilização na oficina *"Contruindo robôs com Puppeteer em NodeJS"* que aconteceu na **4ª Semana Nacional de Ciência e Tecnologia do IFMA Campus Itapecuru-Mirim** no dia 20/10/2020, e na **17ª Semana Nacional de Ciência e Tecnologia do IFRO Campus Ariquemes** no dia 10/11/2020.

Nós automatizamos o monitoramento do preço de um produto específico, de um site fictício que criamos exclusivamente para uso nesta oficina. Para ver a página, entre em https://logicamenteinfo.github.io/lgmt-snct-pupbot/.

## Objetivo

Monitorar o preço de um produto, e assim que for detectada uma redução enviar uma notificação no celular.

## Recursos necessários

- [NodeJS](https://nodejs.org/)
- Uma conta no [Pushbullet](https://www.pushbullet.com/) (vamos usar este serviço para enviar as notificações)

## Executando o projeto

- Clone este projeto
- Crie uma cópia de `.env.sample` com o nome `.env` e altere com as configurações do token do Pushbullet
- Instale as dependências com `npm install`
- Execute com `npm start`

## Configurações

```
PUSHBULLET_TOKEN=
TARGET_SITE=https://logicamenteinfo.github.io/lgmt-snct-pupbot/
TARGET_ID=price
PRICE_THRESHOLD=449900
REFRESH_TIME=2000
```

Chave | Valor
:-- | :--
PUSHBULLET_TOKEN | Seu token da API do Pushbullet
TARGET_SITE | O link que da página que será monitorada
TARGET_ID | O ID da tag HTML que está o preço do produto
PRICE_THRESHOLD | O valor mínimo do produto para o envio da notificação
REFRESH_TIME | Tempo que o robô vai aguardar antes de fazer uma nova verificação
EXIT_ON_SUCCESS | 1 (recomendado) se você quiser que o robô encerre o processo depois que identificar preço abaixo do threshold, 0 para permanecer notificando mesmo depois da primeira identificação

**IMPORTANTE**: lembre-se que configuramos o PRICE_THRESHOLD em um formato onde o valor do produto possui apenas dígitos (e.g. R$ 4.499,00 deve ser escrito 449900)

## Problemas comuns

1. Se na hora de rodar você tiver algum problema relacionado a `loading shared libraries` instale mais umas dependências requeridas pelo puppeteer:

```bash
sudo apt-get update
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 libgbm1 lsb-release xdg-utils wget
```

2. Uso do WSL

Puppeteer não é devidamente suportado pelo Windows Subsystem for Linux (WSL), portanto o programa falhará nessas condições. Instale o NodeJS nativamente na máquina.
