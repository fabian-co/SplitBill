var cuentas = [3000, 3000, 4000];
var monedasDisponibles = [0.01, 0.05, 0.10, 0.25, 0.50]; // Fracciones de centavo

function obtenerCombinacionOptima(promedioOriginal) {
  var combinaciones = [];
  var diferenciaMinima = Infinity;

  // Generar todas las combinaciones posibles
  function generarCombinaciones(montoAcumulado, monedasUtilizadas, indiceMoneda) {
    if (montoAcumulado >= promedioOriginal) {
      var diferencia = montoAcumulado - promedioOriginal;
      if (diferencia < diferenciaMinima) {
        diferenciaMinima = diferencia;
        combinaciones = [monedasUtilizadas];
      } else if (diferencia === diferenciaMinima) {
        combinaciones.push(monedasUtilizadas);
      }
      return;
    }

    for (var i = indiceMoneda; i < monedasDisponibles.length; i++) {
      var nuevaMonedaUtilizada = monedasUtilizadas.concat(monedasDisponibles[i]);
      generarCombinaciones(montoAcumulado + monedasDisponibles[i], nuevaMonedaUtilizada, i);
    }
  }

  generarCombinaciones(0, [], 0);

  // Seleccionar la combinación con menor cantidad de monedas
  var combinacionOptima = combinaciones.reduce(function (min, combinacion) {
    return combinacion.length < min.length ? combinacion : min;
  });

  return combinacionOptima.reduce(function (total, moneda) {
    return total + moneda;
  }, 0);
}

var sumaTotal = cuentas.reduce(function (total, cuenta) {
  return total + cuenta;
}, 0);

var promedioOriginal = sumaTotal / cuentas.length;
var promedioRedondeado = obtenerCombinacionOptima(promedioOriginal);

console.log(promedioRedondeado); // Imprime el promedio redondeado equitativamente




