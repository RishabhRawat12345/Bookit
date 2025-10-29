const express=require("express");

const router=express.Router();
const getdata=require("../Controllers/Book_Controllers");

const Bookes_id=require("../Controllers/BooksByid_Controllers")
const { createBooking } = require("../Controllers/Booking_Create_Controller");

const { applyPromoCode } = require("../Controllers/Promo_Controller");
router.post("/promo/validate", applyPromoCode);

router.get("/experiences",getdata);
router.get("/experiences/:id",Bookes_id);
router.post("/bookings", createBooking);
module.exports=router;