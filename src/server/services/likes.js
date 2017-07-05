import { checkAuth } from './hooks';
import { ifAlreadyLiked, ifCanLike, ifConnected } from './hooks/likes';

const service = {
  name: 'likes',
  addLike({ from, to, push }) {
    const { models: { likes } } = this.globals;
    const data = { from_user: from, to_user: to, date: Date.now(), push };
    return likes.add(data).then(resp => {
      likes.emit('addLike', { from, to, push });
      return Promise.resolve(resp);
    });
  },
  unLike({ from, to }) {
    const { models: { likes } } = this.globals;
    return likes.delete(from, to).then(resp => {
      likes.emit('unLike', { from, to });
      return Promise.resolve(resp);
    });
  },
};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    addLike: [checkAuth, ifCanLike, ifAlreadyLiked, ifConnected],
    unLike: [checkAuth, ifCanLike],
  })
  .after({
  });

export default init;
