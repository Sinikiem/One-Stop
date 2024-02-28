import { properties } from "./config/properties.js";
import server from "./server/express.js"
import logger from "./src/utils/logger.js";
const PORT = +properties.PORT || 3000;

 server.get('/', (req, res) => {
   res.json({ message: "Welcome to the OneStoreApp app" });
 });

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
