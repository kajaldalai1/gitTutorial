const axios = require('axios');
const User = require('../models/User');

const addUser = async (req, res) => {
    console.log("we are in add user");
    console.log(req.body);

    try {
        if (!req.body.phonenumber) {
            throw new Error('Phone number is mandatory');
        }

        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;

        const response = await axios.post('http://localhost:3000/user/add-user', {
            name: name,
            email: email,
            phonenumber: phonenumber
        });

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    }
};

const getUsers = async (req, res) => {
    try {
        console.log("we are in getUsers controllers");
        const response = await axios.get('http://localhost:3000/user/get-users');
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Get user is failing', JSON.stringify(error));
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const uId = req.params.id;

        if (uId === undefined) {
            return res.status(400).json({ err: 'ID is missing' });
        }

        const user = await User.findByPk(uId);

        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        // Rest of the code remains the same...
    } catch (error) {
        console.error('Update user failed', JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const uId = req.params.id;

        if (uId === undefined) {
            return res.status(400).json({ err: 'ID is missing' });
        }

        const response = await axios.delete(`http://localhost:3000/user/delete-user/${uId}`);

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addUser,
    getUsers,
    deleteUser,
    updateUser
};
