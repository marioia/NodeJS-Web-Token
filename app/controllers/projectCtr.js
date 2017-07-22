var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var db = require('../connection');
var app         = express();
app.set('superSecret', config.secret); // secret variable
var crypto = require('crypto');

exports.InsertarProyecto = function(req,res){
  var data = req.body;
// #firstName,#pw,#email,#ComboCategorias,#ComboSubCategorias,#nombreproyecto,#descripcionproyecto,#ComboPresupuesto,#persupuestado'
  var proyecto = {

	//Nombre:data. , 
	Tiulo:data.nombreproyecto , 
	//url:data. , 
	//tags:data. , 
	//descripcion:datadescripcionproyecto. , 
	oferta:data.persupuestado , 
	//fecharegistro:data. , 
	fechaentrega:null , 
	_idbp_Categorias:data.ComboCategorias , 
	_idbp_Subcategorias:data.ComboSubCategorias , 
	desarrollo:data.descripcionproyecto,
	_idPresupuesto:data.ComboPresupuesto

  };


	 db.query('INSERT INTO bp_proyecto SET ?', proyecto, function(err,ress){

	       if(!err){

	          console.log('Proyecto insertado:', ress.insertId);   
	          res.json({ success: true });     

	        }else {

	           res.status(400);  res.send(err);  throw err;
			}
     });
}


// Obtener Proyectos
exports.GetProjects = function(req,res){

    Helper.Query(function(data){     
       if(data!='nodata'){

         res.setHeader('Content-Type', 'application/json');
         res.json(data);
       }else{
           res.json({ success: false });     res.status(400);
       }
  },"SELECT * from V_PROYECTOS",db);

}
