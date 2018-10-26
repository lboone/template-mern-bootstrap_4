const CURRENT_API_VERSION = "v1";
const CURRENT_API_PATH = `./routes/api/${CURRENT_API_VERSION}`;
const CURRENT_API_ROUTE = `/api/${CURRENT_API_VERSION}`;

module.exports = {
  MONGO_URL:
    "mongodb://mern_material_ui_admin:grh-mt3-reS-Jh9@ds113402.mlab.com:13402/mern_material_ui",
  CURRENT_API_VERSION,
  CURRENT_API_PATH,
  CURRENT_API_ROUTE,
  USERS_PATH: `${CURRENT_API_PATH}/users`,
  USERS_ROUTE: `${CURRENT_API_ROUTE}/users`,
  PROFILE_PATH: `${CURRENT_API_PATH}/profile`,
  PROFILE_ROUTE: `${CURRENT_API_ROUTE}/profile`,
  SECRET_KEY:
    "llkskjfjjkjdiurtyhbnlskjdsjhfdljhndsjgffgefegslkdfjkhglkflksdajhrgksjgsdhjgtgaslasmmnvcbcjkfgekjfdgtfkjdsjkh"
};
