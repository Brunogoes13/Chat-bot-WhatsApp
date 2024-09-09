// Importações necessárias
const express = require('express'); // Para servir o frontend
const path = require('path');
const qrcodeTerminal = require('qrcode-terminal');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Criação do app Express
const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Criação de um novo cliente com salvamento de sessão
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Função para exibir e salvar QR Code
const handleQR = (qr) => {
    // Exibe QR Code no terminal
    qrcodeTerminal.generate(qr, { small: true });

    // Salva o QR Code como uma imagem PNG na pasta 'public'
    qrcode.toFile('./public/qr.png', qr, (err) => {
        if (err) {
            console.error('Falha ao gerar QR Code: ', err);
        } else {
            console.log('QR Code salvo com sucesso em ./public/qr.png');
        }
    });
};

// Função para simular um atraso
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para enviar mensagem com atraso
const sendMessageWithDelay = async (chat, message, delayTime = 3000) => {
    await delay(delayTime);
    await chat.sendStateTyping();
    await delay(2000); // Simula o tempo de digitação
    await chat.clearState();
    await chat.sendMessage(message);
};

// Evento de QR Code
client.on('qr', handleQR);

// Evento quando o cliente está pronto
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Função genérica para enviar uma sequência de mensagens com atraso e simulação de digitação
const sendMessagesSequence = async (chat, messages) => {
    for (let message of messages) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(chat.id._serialized, message);
    }
};

// Funil de opções
const funilMenu = {
    '1': [
        'PAVION é uma alternativa ecológica ao asfalto, desenvolvida com NANOTECNOLOGIA...',
        'PAVION SOLUÇÕES é produto tropicalizado...',
        'Nossa empresa está dedicada a promover as melhores inovações...',
        'Estamos constantemente em busca de tecnologias inovadoras...',
        'Veja alguns benefícios de aplicar PAVION...',
        'Veja nosso site: https://pavion.com.br',
        'Por favor, digite uma das opções abaixo:\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.'
    ],
    '2': [
        'Nossa tecnologia inovadora, baseada em nanotecnologia...',
        'Veja nosso site: https://pavion.com.br',
        'Por favor, digite uma das opções abaixo:\n1 - Como funciona Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.'
    ],
    '3': [
        'Pavion é a Revolução Ecológica em Pavimentação com nanotecnologia...',
        '*100% SUSTENTÁVEL:* Tecnologia limpa...',
        '*ECONOMIA SIGNIFICATIVA EM OBRAS:* Redução de até 30% nos custos...',
        '*TRANSPORTE SUSTENTÁVEL:* Economia de 50%...',
        '*MENOS POEIRA:* Mais segurança...',
        '*CONSTRUÇÃO 50% MAIS ÁGIL:* Com o nano estabilizante Pavion...',
        '*ECONOMIZE 20% DE ÁGUA:* Suas obras com solução sustentável...',
        'Veja mais em nosso site: https://pavion.com.br',
        'Por favor, digite uma das opções abaixo:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.'
    ],
    '4': [
        'Para fazer um orçamento você pode se cadastrar na nossa plataforma oficial...',
        'Link para cadastro: https://app.pavionglobal.com.br/',
        'Por favor, digite uma das opções abaixo:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.'
    ],
    '5': [
        'Seu contato já está sendo encaminhado para o nosso time de especialistas...',
        'Enquanto isso, veja mais em nosso site: https://pavion.com.br',
        'Por favor, digite uma das opções abaixo:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.'
    ],
    '6': [
        'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale com nosso time de especialistas...',
        'https://pavion.com.br',
        'Por favor, digite uma das opções abaixo:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n9 – Finalizar o atendimento.'
    ]
};

// Evento para monitorar novas mensagens
client.on('message', async (message) => {
    const chat = await message.getChat();
    const contact = await message.getContact();

    if (message.body.match(/(menu|oi|olá|ola|dia|tarde|noite)/i) && message.from.endsWith('@c.us')) {
        await sendMessageWithDelay(chat, `Olá, ${contact.pushname.split(' ')[0]}! Sou o assistente virtual da Pavion. Como posso ajudá-lo hoje? Digite uma das opções:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.`);
    }

    const option = message.body.trim();

    if (funilMenu[option]) {
        await sendMessagesSequence(chat, funilMenu[option]);
    } else if (option === '9') {
        await client.sendMessage(chat.id._serialized, 'A Pavion agradece seu contato! Até Breve...');
    } else if (!['1', '2', '3', '4', '5', '6', '9'].includes(option)) {
        await client.sendMessage(chat.id._serialized, 'Não entendi sua mensagem, por favor digite um comando válido!\nDigite uma das opções abaixo:\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');
    }
});

// Inicializa o cliente
client.initialize();

// Rota padrão para o front-end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servidor rodando na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
