export default (req, res, next) => {
  console.log("[GNT] coming request");
  console.log(req.headers);
  console.log(req.headers.cookie);
  next();
}