const getAllproductsStatic = async (req, res) => {
    throw new Error('testing async errors')
    res.status(200).json({ msg: "product testing route" })
}

const getAllproducts = async (req, res) => {
    res.status(200).json({ msg: "product route" })
}

module.exports = {
    getAllproductsStatic, getAllproducts
}