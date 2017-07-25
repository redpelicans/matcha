import R from 'ramda';

const addImg = (users) => (req, res, next) => {
  const imgs = {};
  const { user: { id } } = req;
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
  users.addImg(imgs, path, id)
   .then((data) => {
     res.json(R.pick(['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'], data));
     next();
   })
   .catch(() => next({ status: 'error_failed_to_upload' }));
};
export default addImg;
