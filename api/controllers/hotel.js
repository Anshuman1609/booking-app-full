import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("HOTEL has been Deleted");
    } catch (err) {
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};


// export const getHotels = async (req, res, next) => {
//     const { min, max, limit, featured, ...others } = req.query;
//     try {
//         const hotels = await Hotel.find({
//             featured: featured,
//             ...others,
//             cheapestPrice: { $gt: min | 1, $lt: max || 999 }
//         }).limit(limit);
//         res.status(200).json(hotels);
//     } catch (err) {
//         next(err);
//     }
// };

export const getHotels = async (req, res, next) => {
    const { min, max, limit, featured, city, ...others } = req.query;
    try {
        let query = {};
        // If city is provided, add it to the query
        if (city) {
            query.city = city;
        }
        // Add other parameters to the query
        query = {
            ...query,
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 }
        };
        // If featured is provided, add it to the query
        if (typeof featured !== 'undefined') {
            query.featured = featured;
        }
        const hotels = await Hotel.find(query).limit(limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    if (cities) {
        try {
            const list = await Promise.all(
                cities?.map((city) => {
                    return Hotel.countDocuments({ city: city });
                })
            );
            return res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }
};


export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
};