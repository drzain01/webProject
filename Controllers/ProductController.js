const db = require("../model");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Product
  const product = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price ,
    info: req.body.info,
    description: req.body.description,
  };

  // Save Product data in the database
  Product.create(product)
    .then((data) => {
      res.send(data);
    })    
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registeration.",
      });
    });
};

// Retrieve all Registeration from the database.
exports.findAll = (req, res) => {
  var offset = 0
  if(req.query.page!=undefined)
  {
  offset = 5*(req.query.page - 1)
  }
  if(Object.keys(req.query)[0]!=undefined&&Object.keys(req.query)[0].includes("price"))
  {
    condition  = Object.keys(req.query)[0];
    condition = condition.replace("price"," ");

    operation  = condition[2]>="0" && condition[2]<="9" && condition[2]!=undefined?condition[1]:(condition[1]!=undefined?condition[1]:"=")+"=";
    operations={
    ">": Op.gt,
    "<": Op.lt,
    ">=": Op.gte,
    "<=": Op.lte,
    "==": Op.eq,
     }
    
     op =  operations[operation];
     condition = condition.replace(" ","");

    if (req.query.price!=undefined)
    {
      value = req.query.price;
    }
    else if(operation==">="|| operation=="<=")
    {
      value = Object.values(req.query)[0];
    }
    else 
    {
      condition = condition.replace(operation,"");
      value = parseInt(condition);
    }
    Product.findAll({where: {price:{ [op] :value}}})
    .then((data) => {
      if (data.length!=0)
          res.send(data);
      else
          res.send("No Data Found!!!");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registeration.",
      });
    });
  }
  else{
  Product.findAll({ offset: offset, limit: 5 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registeration.",
      });
    });
  }
};

// Find a single Registeration with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Registered.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Registeration with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Registeration with id=" + id,
      });
    });
};

// Update a Registeration by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Registered.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Registeration was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Registeration with id=${id}. Maybe Registeration was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Registeration with id=" + id,
      });
    });
};

// Delete a Registeration with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Registered.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Registeration was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Registeration with id=${id}. Maybe Registeration was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Registeration with id=" + id,
      });
    });
};

// Delete all Registeration from the database.
exports.deleteAll = (req, res) => {
  Registered.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Registeration were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Registeration.",
      });
    });
};

// READ ALL Caterings of a particular id user
exports.findALLCaterings = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [Catering] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Catering.",
      });
    });
};

// READ ALL Halls of a particular id user
exports.findALLHalls = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.hall] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-halls.",
      });
    });
};

// READ ALL dress of a particular id user
exports.findALLDress = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.dress] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-dresses.",
      });
    });
};

// READ ALL Salons of a particular id user
exports.findALLSalons = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.salon] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Salons.",
      });
    });
};

// READ ALL vehicles of a particular id user
exports.findALLVehicles = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.vehicle] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Vehicles.",
      });
    });
};

// READ ALL FeedBack of a particular id user
exports.findALLFeedback = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.hall] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Feedback.",
      });
    });
};

