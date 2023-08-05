import { NFC, Card } from 'nfc-pcsc';

const nfc: NFC = new NFC();

nfc.on('reader', reader => {

    console.log(`${reader.reader.name}  device attached`);

    reader.autoProcessing = false;

    reader.on('card', async (card: Card) => {
        console.log(`${reader.reader.name}  card detected`, card);

        const data = card.data.toString('utf8');
        console.log('Data read:', data);
    });

    reader.on('card.off', card => {
        console.log(`${reader.reader.name}  card removed`, card);
    });

    reader.on('error', err => {
        console.log(`${reader.reader.name}  an error occurred`, err);
    });

    reader.on('end', () => {
        console.log(`${reader.reader.name}  device removed`);
    });

});

nfc.on('error', err => {
    console.log('an error occurred', err);
});

