import R from 'ramda';

const addImg = (users) => async (ctx) => {
  const { req } = ctx;
  const imgs = {};
  const { user: { id } } = ctx;
  const { imgProfile } = req.files;
  let path = null;

  if (req.files.imgs) {
    req.files.imgs.forEach((img, index) => {
      imgs[`photo_${index + 1}`] = `/uploads/${img.filename}`;
    });
  }
  if (imgProfile) {
    path = `/uploads/${req.files.imgProfile[0].filename}`;
  }
  try {
    const data = await users.addImg(imgs, path, id);
    ctx.body = R.pick(['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'], data);
  } catch (err) {
    ctx.status = 201;
    ctx.body = 'Failed to authenticate';
  }
};
export default addImg;
