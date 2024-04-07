const notFound = (req, res)=> {
    res.status(404).send('Route doest not exist, please try again')
}

module.exports = notFound;