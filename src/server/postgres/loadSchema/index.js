import createTables from '../createTables';

const loadSchema = (ctx) => createTables(ctx)
    .then(() => ctx);

export default loadSchema;
