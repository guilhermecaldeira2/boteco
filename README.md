# Boteco 🤖

Fastest framework for develop Botmaker Bots, but with low changes can use with different chatbot hosts;

## To use

- Install with:

```console
  npm install -D boteco
```

- Import with:

```javascript
const Boteco = require('Boteco').default;
// or in typescript or ES modules
import Boteco from 'Boteco';
```

- Use With:

```javascript
const bot = new Boteco({
  contextType: 'botmaker',
  TOKEN: '<Bot maker Token>',
});

bot.hears('Oi', (ctx) => {
  const hostNumber = ctx.me.telephoneNumber;
  const clientNumber = ctx.from.user.telephoneNumber;
  ctx.sendMessage('Hello from Boteco!', {
    chatPlatform: 'whatsapp',
    chatChannelNumber: hostNumber,
    platformContactId: clientNumber,
  });
});

bot.launch();
```

- Run javascript file 👻 👻

### Advanced

- Wizard with session example:

```javascript
const Boteco = require('boteco').default;
const session = require('boteco').default;
const Composer = require('boteco').default;
const Wizard = require('boteco').default;
const Stage = require('boteco').default;

const bot = new Boteco({
  contextType: 'botmaker',
  TOKEN: '<Bot maker Token>',
});

bot.use(session());

const composerFN = new Composer();

composerFN.hears(/^(\w+)$/gm, async (ctx) => {
  [ctx.session.firstName] = ctx.match;
  await ctx.sendMessage(`Hello! ${ctx.session.firstName}`, {
    chatPlatform: 'whatsapp',
    chatChannelNumber: ctx.me.telephoneNumber,
    platformContactId: ctx.from.user.telephoneNumber,
  });
  await ctx.sendMessage('Tel me your last name:', {
    chatPlatform: 'whatsapp',
    chatChannelNumber: ctx.me.telephoneNumber,
    platformContactId: ctx.from.user.telephoneNumber,
  });

  ctx.wizard.next();
});

composerFN.use((ctx) => {
  ctx.sendMessage("Sorry, i don't understand", {
    chatPlatform: 'whatsapp',
    chatChannelNumber: ctx.me.telephoneNumber,
    platformContactId: ctx.from.user.telephoneNumber,
  });
});

const composerLN = new Composer();

composerLN.hears(/^(\w+)$/gm, (ctx) => {
  [ctx.session.lastName] = ctx.match;
  ctx.sendMessage(`Yeah! You said: ${ctx.session.firstName} ${ctx.session.lastName}!`, {
    chatPlatform: 'whatsapp',
    chatChannelNumber: ctx.me.telephoneNumber,
    platformContactId: ctx.from.user.telephoneNumber,
  });
  ctx.scene.leave();
});

const wizName = new Wizard(
  'NAMEWIZARD',
  (ctx) => {
    ctx.sendMessage('Tel me your first name: ', {
      chatPlatform: 'whatsapp',
      chatChannelNumber: ctx.me.telephoneNumber,
      platformContactId: ctx.from.user.telephoneNumber,
    });
    return ctx.wizard.next();
  },
  composerFN,
  composerLN,
);

const stage = new Stage([wizName]);

bot.use(stage.middleware());

bot.hears('Hi', (ctx) => {
  const hostNumber = ctx.me.telephoneNumber;
  const clientNumber = ctx.from.user.telephoneNumber;
  ctx.sendMessage('Hello from Boteco!', {
    chatPlatform: 'whatsapp',
    chatChannelNumber: hostNumber,
    platformContactId: clientNumber,
  });
  ctx.scene.enter('NAMEWIZARD');
});

bot.launch();
```
