const getAllproductsStatic = async (req, res) => {
    res.status(200).json({ msg: "product testing route" })
}

const getAllproducts = async (req, res) => {
    res.status(200).json({ msg: "product testing route" })
}

module.exports = {
    getAllproductsStatic, getAllproducts
}