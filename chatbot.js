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

// Evento para monitorar novas mensagens
client.on('message', async (message) => {
    console.log(`Nova mensagem de ${message.from}: ${message.body}`);

    // Responde automaticamente com uma mensagem de saudação
    const chat = await message.getChat();
    await sendMessageWithDelay(chat, 'Olá! Esta é uma resposta automática.', 3000);
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


// Inicializa o cliente
client.initialize();


// Função de delay
const delay = ms => new Promise(res => setTimeout(res, ms));


// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá, '+ name.split(" ")[0] + '! \n\nSou o assistente virtual da Pavion. Como posso ajudá-lo hoje? \n\nPor favor, digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento\n5 - Quero falar com um especialista\n6 - Outras dúvidas'); //Primeira mensagem de texto
    }


    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'PAVION é uma alternativa ecológica ao asfalto, desenvolvida com NANOTECNOLOGIA, isento de componentes agressivos à natureza e de rápida e fácil aplicação. Promove a melhoria nas estradas por meio de sua atuação no solo por processo iônico, com alta resistência aos impactos, resiliência e durabilidade.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*PAVION SOLUÇÕES* é produto tropicalizado, que já foi aplicado em todas regiões do Brasil contemplando todos os grupos de solo, do arenoso ao argiloso, somos referência nacional no como estabilizante com NANOTECNOLOGIA na construção de estradas.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Nossa empresa está dedicada a promover as melhores inovações, não apenas para impulsionar nosso próprio crescimento, mas também para gerar impacto social positivo. Acreditamos que a tecnologia deve ser acessível a todos e trabalhamos para tornar isso uma realidade.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Estamos constantemente em busca de tecnologias inovadoras, tanto no mercado nacional quanto internacional, com o objetivo de oferecer sempre o que há de melhor para nossos clientes. Nosso compromisso é estar na vanguarda, antecipando tendências e superando expectativas.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Veja alguns benefícios de aplicar PAVION!\n\n*Versatilidade Personalizada:* O PAVION Nano Estabilizante se adapta às nuances de 75% do território brasileiro, proporcionando uma solução personalizada para cada região.\n\n*Sustentabilidade em Ação:* Ao transformar estradas não pavimentadas, estamos abrindo caminho para uma pavimentação sustentável, alinhada com os princípios ecológicos.\n\n*Eficiência Ajustável:* Com uma incrível adaptabilidade de 15%, nossa inovação se ajusta dinamicamente para atender às necessidades específicas de cada projeto.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Veja nosso site: \nhttps://pavion.com.br');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Nossa tecnologia inovadora, baseada em nanotecnologia, oferece uma alternativa ecológica ao asfalto, promovendo a melhoria das vias com uma série de vantagens.\n\nO Produto PAVION pode ser aplicado em:\n\nEstradas Vicinais.\nSaneamento.\nConstrução Civil.\nAterros Sanitários.\nTanques para peixe e camarões.\nPetróleo.\nMineração.\nFerrovias.\nIndustrias.\nEstabilização encostas.\nEnergias Eólica.\nPista de aeroportos.\nCalçada para Pedestres.\nÁrea de lazer.\nCiclovias.\nRuas, Estradas e Rodovias.\nLinhas de Transmissão.\nParques.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Veja nosso site: \nhttps://pavion.com.br');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Pavion é a Revolução Ecológica em Pavimentação com nanotecnologia.\nNossa tecnologia inovadora, baseada em nanotecnologia, oferece uma alternativa ecológica ao asfalto, promovendo a melhoria das vias com uma série de vantagens:');
        
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*100% SUSTENTÁVEL:*\nTecnologia limpa à base de enzimas para um mundo mais verde proteja o solo e o meio ambiente sem restrições com nosso nano estabilizante.');
        
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*ECONOMIA SIGNIFICATIVA EM OBRAS:*\nRedução de até 30% nos custos com nosso nano estabilizante muito mais eficiência, logística e pavimentação econômica para seus projetos de sucesso construa mais por menos.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*TRANSPORTE SUSTENTÁVEL:*\nEconomia de 50% com nosso nano estabilizante reduz a emissão de CO2 e economiza no transporte de materiais. Inovação ambiental: elimine a necessidade de base e sub-base.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*MENOS POEIRA:*\nMais segurança, redução de 30% nas estradas com nosso nano estabilizante bem-estar e visibilidade nas rodovias, tecnologia que elimina resíduos uma solução limpa para estradas mais seguras.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*CONSTRUÇÃO 50% MAIS ÁGIL:*\nCom o nano estabilizante Pavion o produto certo para sua obra compactação, simples e transporte eficiente ganhe tempo e eficiência em seus projetos com nossa tecnologia inovadora.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);        
        await client.sendMessage(msg.from, '*ECONOMIZE 20% DE ÁGUA:*\nSuas obras com solução sustentável redução de poeira e uso responsável de recursos hídricos, construa de forma inteligente, pensando no futuro do planeta.');
        
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Pavion aumenta o CBR (índice que mede a resistência do solo) do próprio solo do local em 600% suportando caminhões de 250 toneladas.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Veja mais em nosso site: \nhttps://pavion.com.br');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona a Pavion?\n2 - Onde posso aplicar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');

    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Para fazer um orçamento você pode se cadastrar na nossa plataforma oficial dos Parceiros Pavion e lá mesmo você já consegue fazer seu orçamento. Basta você clicar no link abaixo e fazer o seu cadastro.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: \nhttps://app.pavionglobal.com.br/');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona a Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');


    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Seu contato já está sendo encaminhado para o nosso time de especialistas, agora é só aguardar que o mais breve possível entraremos em contato pelo WhatsApp.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Enquanto isso, veja mais em nosso site: \nhttps://pavion.com.br');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');

        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage('5511971296048@c.us', '*Contato via ChatBot*\n\nPor favor entrar em contato com: '+ name.split(" ")[0] +'\n\nAtravez do link abaixo!\n\nhttps://wa.me/' + `${contact.number}`);

    }
    
    if (msg.body !== null && msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale com nosso time de especialistas ou visite nosso site.');

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'https://pavion.com.br');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n9 – Finalizar o atendimento.');

    }

    if (msg.body !== null && msg.body === '9' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'A Pavion agradece seu contato! Até Breve...');

    }

    if (msg.body !== null && msg.body === '0' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');

    }

    if (msg.body !== null && !['1', '2', '3', '4', '5', '6', '9', 'menu', 'Menu', 'oi', 'Oi', 'Olá', 'olá', 'ola', 'Ola'].includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); // Delay de 3000 milisegundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); // Delay de 3000 milisegundos

        // Mensagem de erro
        await client.sendMessage(msg.from, 'Não entendi sua mensagem, por favor digite um comando válido!');

        // Menu de opções
        await client.sendMessage(msg.from, 'Digite uma das opções abaixo:\n\n1 - Como funciona Pavion?\n2 - Onde posso aplicar Pavion?\n3 - Quais os benefícios em utilizar Pavion?\n4 - Preciso de um orçamento.\n5 - Quero falar com um especialista.\n6 - Outras dúvidas.\n9 – Finalizar o atendimento.');
    }










});
