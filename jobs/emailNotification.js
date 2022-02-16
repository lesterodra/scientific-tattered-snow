const cron = require('node-cron');
const emailNotification = require('../notifications/emailNotification');
const buildPromise = pending => {
    return pending.map(({ username, address, message, id }) => {
        const EmailNotification = new emailNotification();
        return EmailNotification.send({
            username,
            address,
            message,
            id,
        });
    })
};

module.exports = {
    start: () => {
        cron.schedule('*/15 * * * * *', async () => {
            console.log({ message: 'running email notification', data: global.pendingEmail });
            const results = await Promise.all(buildPromise(global.pendingEmail));

            results.forEach(({ messageId, id }) => {
                if (messageId) {
                    console.log('email sent: ', id);
                    const index = global.pendingEmail.findIndex(data => data.id === id);
                    delete global.pendingEmail[index];
                    global.pendingEmail = global.pendingEmail.filter(val => val);

                }
            });
        }).start();
    },
}