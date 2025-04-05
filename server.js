
const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Custom search route
server.get('/pets/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const pets = router.db.get('pets').value();

    const filteredPets = pets.filter(pet =>
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query) ||
        pet.type.toLowerCase().includes(query)
    );

    res.json(filteredPets);
});

server.use(cors());
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});