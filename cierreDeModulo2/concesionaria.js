const autos = require('./autos')

const concesionaria = {
   autos: autos,

   buscarAuto: function(patenteBuscada) {
    for(let i = 1; i < autos.length; i++) {
        if(autos[i].patente == patenteBuscada) {
        return autos[i];
        }
    return null
    }
},

    venderAuto: function(patenteBuscada) {
        let autosEnVenta = this.buscarAuto(patenteBuscada);

        if(autosEnVenta) {
            autosEnVenta.vendido = true;
            return autosEnVenta
        } 
        return null
    },

    autosParaLaVenta: function() {
        let autosDisponibles = this.autos.filter(function(auto) {
            return auto.vendido == false;
        });
        return autosDisponibles;
    },

    autosNuevos: function() {
        let autos0KM = this.autosParaLaVenta().filter(function(auto) {
            return auto.km < 100
        });
        return autos0KM;
    },

    listaDeVentas: function() {
        let autosVendidos = this.autos.filter(function(auto) {
            return auto.vendido == true;
        });
        
        let precios = autosVendidos.map(function(auto) {
            return auto.precio;
        });

        return precios;

    },

    totalDeVentas: function() {
        let preciosTotales = this.listaDeVentas().reduce((acum, precios,) => acum + precios, 0);
        return preciosTotales
    },

    puedeComprar: function(auto, persona) {
        if(auto.precio < persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) < persona.capacidadDePagoEnCuotas) {
            return true;
        }
        return false
    },

    autosQuePuedeComprar: function(persona) {
        let autosDisponibles = this.autosParaLaVenta().filter(function(auto) {
            return auto.precio < persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) < persona.capacidadDePagoEnCuotas
        });
        return autosDisponibles
    }
}

console.log(concesionaria.autosQuePuedeComprar({nombre: 'Juan',capacidadDePagoEnCuotas: 20000,capacidadDePagoTotal: 100000}));



