export default (req, res, next) => {
  const ips = process.env.WHITELISTED_IPS.split(",");
  if (!ips.includes(req.ip)) return res.sendStatus(403);
  next();
};
