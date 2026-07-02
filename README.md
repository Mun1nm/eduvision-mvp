# EduVision MVP

Aplicativo mobile (React Native + Expo) para apoio pedagógico: gestão de turmas, aplicação e correção de avaliações, geração de insights sobre habilidades dos alunos, planos de intervenção e relatórios para professores.

## Stack

- [Expo](https://docs.expo.dev/) 52 / React Native 0.76
- React 18 + TypeScript
- Firebase (dependência já incluída no projeto)

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) 18 ou superior (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- npm (instalado junto com o Node)
- App **Expo Go** no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) — útil para testar rapidamente sem emulador
- (Opcional) [Android Studio](https://developer.android.com/studio) para rodar no emulador Android
- (Opcional) Xcode (apenas macOS) para rodar no simulador iOS

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd eduvision-mvp
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## Rodando o projeto localmente

Inicie o servidor de desenvolvimento do Expo:

```bash
npm start
```

Isso abrirá o Metro Bundler no terminal com um QR Code. A partir daí você pode:

- **Celular físico**: abrir o app Expo Go e escanear o QR Code (Android) ou usar a câmera nativa (iOS). Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi.
- **Emulador Android**: com o Android Studio configurado e um emulador aberto, rode:

  ```bash
  npm run android
  ```

- **Simulador iOS** (apenas macOS com Xcode instalado):

  ```bash
  npm run ios
  ```

- **Navegador (web)**:

  ```bash
  npm run web
  ```

## Verificação de tipos

Para checar os tipos TypeScript sem gerar build:

```bash
npm run typecheck
```

## Solução de problemas

- **Erro de cache do Metro Bundler**: rode `npx expo start -c` para limpar o cache.
- **Dependências desatualizadas/incompatíveis**: rode `npx expo install --check` para o Expo sugerir as versões corretas para o SDK do projeto.
- **App não conecta pelo Expo Go**: verifique se o firewall não está bloqueando a conexão e se o celular está na mesma rede do computador.
