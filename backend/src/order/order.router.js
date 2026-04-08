import { Router } from "express";

import { getOrders, addOrder, getOrder} from "./order.controller.js";

const orderRouter = Router()

orderRouter.get("/", getOrders)
orderRouter.get("/:orderId", getOrder)
orderRouter.post("/", addOrder)

export default orderRouter