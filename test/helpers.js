module.exports = {
    request: ({ body }) => ({
        body,
    }),
    response: () => {
        this.status = () => this;
        this.json = data => data;
        return this;
    },
    next: () => {}, 
};