const simbolos = [
    "$", "●", "↑", "→", "☺", "☹", "⏰", "⌚", "★", "☆",
    "◉", "○", "✈", "⚓", "☀", "☁", "☂", "☃", "☄", "★",
    "☎", "✉", "✂", "✏", "✒", "✿", "❀", "❁", "❂", "❃",
    "❄", "❅", "❆", "❇", "❈", "❉", "❊", "❋", "❖", "❤",
    "❥", "❦", "❧", "❨", "❩", "❪", "❫", "❬", "❭", "❮",
    "❯", "❰", "❱", "❲", "❳", "❴", "❵", "❶", "❷", "❸",
    "❹", "❺", "❻", "❼", "❽", "❾", "❿", "➀", "➁", "➂",
    "➃", "➄", "➅", "➆", "➇", "➈", "➉", "➊", "➋", "➌",
    "➍", "➎", "➏", "➐", "➑", "➒", "➓", "⓫", "⓬", "⓭",
    "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"
];
const sonidos = ["1.mp3", "2.mp3", "3.mp3", "4.mp3","error.wav"];
var cara1 = "";
var cara2 = "";
var contar = 0;
var temp = [];
var elejidos = [];var m = [];var m1=[];
var correcto = [];
var filas = 2;
var columnas = 3;
iniciar();
function iniciar(){
  tomarElejidos();
  desordenar();
  crearMatriz();
  visualizarPantalla();
}
function reiniciar(){
        columnas=2;
        filas=3;
        elejidos=[];
        temp = [];
        m=[];
        m1=[];
        correcto=[];
        iniciar();
        contar = 0;
}

var turno = 0;
function crearMatriz(){
  var k = 0;var k1 = elejidos.length-1;
  for (var i = 0; i < filas; i++) {
    m[i] = [];m1[i] = [];
    console.log(i+" llleg  <br>");
    for (var j = 0; j < columnas; j++) {
      // Inicializar cada elemento con valores automáticos (por ejemplo, i * columnas + j + 1)
      console.log(k+"<br>");
      if(k<elejidos.length){
        m[i][j] = " <button class = 'btnej'id='"+i+","+j+"'style=' border: 2px solid white;background-color:red;width: 70px;height: 50px;font-size:25px' onclick='ejecutar(\""+i+","+j+"\")'>?</button>";
        m1[i][j] = elejidos[k];
        k++;
      }else{
        m1[i][j] = elejidos[k1];
        m[i][j] = " <button class = 'btnej'id='"+i+","+j+"'style=' border: 2px solid white;background-color:red;width: 70px;height: 50px;font-size:25px' onclick='ejecutar(\""+i+","+j+"\")'>?</button>";
        k1--;
      }

    }
  }
}
function ejecutar(id){
  if(turno < 2){
    //console.log('Se hizo clic en el botón:', id);
    var sep = id.split(",");
    const btn = document.getElementById(id);
    btn.textContent = m1[sep[0]][sep[1]];
    temp.push(id);
    if(cara1 == ""){
      cara1 =  m1[sep[0]][sep[1]];
    }else{
      cara2 =  m1[sep[0]][sep[1]];
    }
    turno++;
    //console.log("turno   "+turno+"<br>")
    if(turno == 2){comprovar();
    }else{
      reproducirSonido("musica/1.mp3");
    }
  }
}
/*const botones = document.querySelectorAll('.btnej');
// Añade un controlador de eventos a cada botón
botones.forEach(boton => {
    boton.addEventListener('click', () => {

    });
});*/
function visualizarPantalla(){
  // Obtener el div donde mostrar la matriz
   var miDiv = document.getElementById("cuerpo");
   // Crear el contenido de texto para mostrar la matriz
   var contenidoTexto = "";

   for (var i = 0; i < filas; i++) {
     for (var j = 0; j < columnas; j++) {
       contenidoTexto += m[i][j]+" ";
     }
     contenidoTexto += "<br>";
   }
   // Asignar el contenido de texto al div
   miDiv.innerHTML = contenidoTexto;
}

function tomarElejidos(){
  var mul = (filas * columnas)/2;var k=0;
  for(var j=0;j<simbolos.length;j++){
    if(k<mul){
      elejidos[k] = simbolos[j];
      k++;
    }else{
      break;
    }
  }
}

function desordenar(){
  var jj = 1;
  for(var i=elejidos.length-jj;i>=0;i--){
      var posicion = Math.floor(Math.random() * i);
      var aux = elejidos[posicion];
      elejidos[posicion] = elejidos[i];
      elejidos[i] = aux;
      jj++;
  }
}

function comprovar(){;
  var si = "no";
  //console.log(temp.length+"   core   "+correcto.length+"<br>");
  if(cara1 == cara2){
    si="si";
  }
  if(si != "si"){
    volverIniciar();
    reproducirSonido("musica/error.wav");
  }else{

    guardar();
    turno = 0;

    reproducirSonido("musica/cel.mp3");
//console.log("esta mal"+(filas*columnas)+"   "+correcto.length+"<br>");
    if((filas*columnas) == (correcto.length)){
      contar++;
      
      columnas++;
      filas++;
      elejidos=[];
      temp = [];
      m=[];
      m1=[];
      correcto=[];
      if(contar == 3){
        si = "no";
        alert("Esto es el fin, reinicia el juego");
        return;
      }
      iniciar();
    }
  }
  cara1 = "";
  cara2="";
  marcaCorrectos();

}

function volverIniciar(){
  for(var j=0;j<temp.length;j++){
    var sep = temp[j].split(",");
    const btn = document.getElementById(temp[j]);
    btn.textContent = "?";
  }
  turno = 0;
  temp.length = 0;
}
//funcion para guardar los simbolos correctos
function guardar(){
    for(var j=0;j<temp.length;j++){
        correcto.push(temp[j]);
    }
    temp.length = 0;
}

function marcaCorrectos(){
  for(var j=0;j<correcto.length;j++){
    var sep = correcto[j].split(",");
    const btn = document.getElementById(correcto[j]);
    btn.textContent = m1[sep[0]][sep[1]];
  }
}
function reproducirSonido(src) {
    const audio = new Audio(src);
    audio.play();
}
