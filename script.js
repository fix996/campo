document.addEventListener("DOMContentLoaded", () => {
  const diasEl = document.getElementById("dias");
  const mesAnioEl = document.getElementById("mes-anio");
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let fecha = new Date();

  function renderizarCalendario(fechaActual) {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    mesAnioEl.textContent = `${meses[mes]} ${año}`;
    diasEl.innerHTML = "";

    const primerDia = new Date(año, mes, 1).getDay();
    const ajuste = (primerDia + 6) % 7;
    const totalDias = new Date(año, mes + 1, 0).getDate();

    for (let i = 0; i < ajuste; i++) {
      diasEl.innerHTML += `<div></div>`;
    }

    const hoy = new Date();
    const esEsteMes = hoy.getFullYear() === año && hoy.getMonth() === mes;

    for (let d = 1; d <= totalDias; d++) {
      const clase = (esEsteMes && d === hoy.getDate()) ? "hoy" : "";
      const fechaStr = `${año}-${mes + 1}-${d}`;
      const tieneNota = localStorage.getItem(fechaStr);

      diasEl.innerHTML += `
        <div class="${clase}" data-fecha="${fechaStr}" style="${tieneNota ? 'background:#fffa90;' : ''}">
          ${d}
        </div>`;
    }
  }

  document.getElementById("prev").onclick = () => {
    fecha.setMonth(fecha.getMonth() - 1);
    renderizarCalendario(fecha);
  };

  document.getElementById("next").onclick = () => {
    fecha.setMonth(fecha.getMonth() + 1);
    renderizarCalendario(fecha);
  };

  renderizarCalendario(fecha);

  // Modal
  const modal = document.getElementById("modalNota");
  const cerrarModal = document.getElementById("cerrarModal");
  const notaTexto = document.getElementById("notaTexto");
  const guardarNota = document.getElementById("guardarNota");
  const tituloFecha = document.getElementById("tituloFecha");
  let fechaSeleccionada = "";

  cerrarModal.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target == modal) modal.style.display = "none"; }

  guardarNota.onclick = () => {
    const texto = notaTexto.value;
    localStorage.setItem(fechaSeleccionada, texto);
    modal.style.display = "none";
    renderizarCalendario(fecha);
  };

  diasEl.onclick = e => {
    if (e.target.dataset.fecha) {
      fechaSeleccionada = e.target.dataset.fecha;
      tituloFecha.textContent = `Nota para el ${fechaSeleccionada}`;
      notaTexto.value = localStorage.getItem(fechaSeleccionada) || "";
      modal.style.display = "block";
    }
  };

  // Calculadora de parto
  document.getElementById("calcularBtn").onclick = () => {
    const animal = document.getElementById('animal').value;
    const fechaInput = document.getElementById('fechaPreñez').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!fechaInput) {
      resultadoDiv.textContent = "Por favor, seleccioná una fecha.";
      return;
    }

    const fecha = new Date(fechaInput);
    let mesesGestacion = 9;

    if (animal === "vaca") {
      mesesGestacion = 9;
    }

    fecha.setMonth(fecha.getMonth() + mesesGestacion);

    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    resultadoDiv.textContent = "Fecha estimada de parto: " + fecha.toLocaleDateString('es-ES', opciones);
  };
});
