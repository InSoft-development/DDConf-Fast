let password = document.getElementById('exampleInputPassword1');
let togglePassword = document.getElementById
('toggle');
function showHide(){
    if(password.type === 'password'){
        password.setAttribute('type', 'text');
        togglePassword.classList.add('hide');
    }
    else{
        password.setAttribute('type', 'password');
        togglePassword.classList.remove('hide');
    }
}
// /////////////////////// Протокол МЭК 104 ///////////////////////////////
// ................................. 1 строка ..................................
function start1(){
    let play1 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div>    
    `;
    document.getElementById("play1").innerHTML = play1;
    document.getElementById("STP1").innerHTML = " ";
    document.getElementById("RES1").innerHTML = " ";
}
function stop1(){
    let STP1 =`
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div>  
    `;
    document.getElementById("STP1").innerHTML = STP1;
    document.getElementById("play1").innerHTML = " ";
    document.getElementById("RES1").innerHTML = " ";
}
function restart1(){
    let RES1 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(10, 162, 192); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запускается</div>
    </div>   
    `;
    document.getElementById("RES1").innerHTML = RES1;
    document.getElementById("play1").innerHTML = " ";
    document.getElementById("STP1").innerHTML = " ";
}
// .................................................. 2 строка .............................................................
// function start2(){
//     let play2 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
//     </div>    
//     `;
//     document.getElementById("play2").innerHTML = play2;
//     document.getElementById("STP2").innerHTML = " ";
//     document.getElementById("RES2").innerHTML = " ";
// }
// function stop2(){
//     let STP2 =`
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
//     </div>  
//     `;
//     document.getElementById("STP2").innerHTML = STP2;
//     document.getElementById("play2").innerHTML = " ";
//     document.getElementById("RES2").innerHTML = " ";
// }
// function restart2(){
//     let RES2 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(10, 162, 192); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запускается</div>
//     </div>   
//     `;
//     document.getElementById("RES2").innerHTML = RES2;
//     document.getElementById("play2").innerHTML = " ";
//     document.getElementById("STP2").innerHTML = " ";
// }

// .................................................. 3 строка .............................................................
// function start3(){
//     let play3 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
//     </div>    
//     `;
//     document.getElementById("play3").innerHTML = play3;
//     document.getElementById("STP3").innerHTML = " ";
//     document.getElementById("RES3").innerHTML = " ";
// }
// function stop3(){
//     let STP3 =`
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
//     </div>  
//     `;
//     document.getElementById("STP3").innerHTML = STP3;
//     document.getElementById("play3").innerHTML = " ";
//     document.getElementById("RES3").innerHTML = " ";
// }
// function restart3(){
//     let RES3 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(10, 162, 192); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запускается</div>
//     </div>   
//     `;
//     document.getElementById("RES3").innerHTML = RES3;
//     document.getElementById("play3").innerHTML = " ";
//     document.getElementById("STP3").innerHTML = " ";
// }
// .................................. 4 строка ...................................................
// function start4(){
//     let play4 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
//     </div>    
//     `;
//     document.getElementById("play4").innerHTML = play4;
//     document.getElementById("STP4").innerHTML = " ";
//     document.getElementById("RES4").innerHTML = " ";
// }
// function stop4(){
//     let STP4 =`
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
//     </div>  
//     `;
//     document.getElementById("STP4").innerHTML = STP4;
//     document.getElementById("play4").innerHTML = " ";
//     document.getElementById("RES4").innerHTML = " ";
// }
// function restart4(){
//     let RES4 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(10, 162, 192); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запускается</div>
//     </div>   
//     `;
//     document.getElementById("RES4").innerHTML = RES4;
//     document.getElementById("play4").innerHTML = " ";
//     document.getElementById("STP4").innerHTML = " ";
// }
// ...................................... 5 строка ......................................
// function start5(){
//     let play5 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
//     </div>    
//     `;
//     document.getElementById("play5").innerHTML = play5;
//     document.getElementById("STP5").innerHTML = " ";
//     document.getElementById("RES5").innerHTML = " ";
// }
// function stop5(){
//     let STP5 =`
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
//     </div>  
//     `;
//     document.getElementById("STP5").innerHTML = STP5;
//     document.getElementById("play5").innerHTML = " ";
//     document.getElementById("RES5").innerHTML = " ";
// }
// function restart5(){
//     let RES5 = `
//     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
//     <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(10, 162, 192); margin-top: 9px;"></div>
//     <div style="margin-top: 0px;margin-left: 8px;">запускается</div>
//     </div>   
//     `;
//     document.getElementById("RES5").innerHTML = RES5;
//     document.getElementById("play5").innerHTML = " ";
//     document.getElementById("STP5").innerHTML = " ";
// }
// //////////////////////////////// Кнопка открыть log ///////////////////////////////////////////
// const btnlog = document.querySelector('.btnlog');

// btnlog.addEventListener('click', ()=>{
//     btnlog.style.backgroundColor = 'rgb(196, 196, 196)';
//     btnlog.style.boxShadow = '0 0 5px rgb(196, 196, 196)';
// })
// .......... Функция открытия поля логов по нажатию кнопки "Открыть log" ................
function openlog(){
    let log = `
    <div class="form-floating" style="width: 850px; height: 225px; margin-left: 95px; margin-top: 41px;" >
    <textarea class="form-control"  placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
    <label for="floatingTextarea2">Comments</label>
    </div>   
    `;
    document.getElementById("log").innerHTML = log;
}
// ........Кнопка "Запустить все".....................
function onmore(){
    let play1 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div>  
    `;
    document.getElementById("play1").innerHTML = play1;
    document.getElementById("STP1").innerHTML = " ";
    document.getElementById("RES1").innerHTML = " ";

    let play2 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div> 
    `;
    document.getElementById("play2").innerHTML = play2;
    document.getElementById("STP2").innerHTML = " ";
    document.getElementById("RES2").innerHTML = " ";
    let play3 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div> 
    `;
    document.getElementById("play3").innerHTML = play3;
    document.getElementById("STP3").innerHTML = " ";
    document.getElementById("RES3").innerHTML = " ";
    let play4 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div> 
    `;
    document.getElementById("play4").innerHTML = play4;
    document.getElementById("STP4").innerHTML = " ";
    document.getElementById("RES4").innerHTML = " ";
    let play5 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:#13795b; margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">запущен</div>
    </div> 
    `;
    document.getElementById("play5").innerHTML = play5;
    document.getElementById("STP5").innerHTML = " ";
    document.getElementById("RES5").innerHTML = " ";
}
// .............................. Кнопка "Остановить все"...................
function offmore(){
    let STP1 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div> 
    `;
    document.getElementById("STP1").innerHTML = STP1;
    document.getElementById("play1").innerHTML = " ";
    document.getElementById("RES1").innerHTML = " ";

    let STP2 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div> 
    `;
    document.getElementById("play2").innerHTML = " ";
    document.getElementById("STP2").innerHTML = STP2;
    document.getElementById("RES2").innerHTML = " ";
    let STP3 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div> 
    `;
    document.getElementById("play3").innerHTML = " ";
    document.getElementById("STP3").innerHTML = STP3;
    document.getElementById("RES3").innerHTML = " ";
    let STP4 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div>  
    `;
    document.getElementById("play4").innerHTML = " ";
    document.getElementById("STP4").innerHTML = STP4;
    document.getElementById("RES4").innerHTML = " ";
    let STP5 = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-top:12px;width: 109px; height: 24px;">
    <div style="width: 8px; height: 8px; border-radius: 100%;background:rgb(253, 126, 20); margin-top: 9px;"></div>
    <div style="margin-top: 0px;margin-left: 8px;">остановлен</div>
    </div>  
    `;
    document.getElementById("play5").innerHTML = " ";
    document.getElementById("STP5").innerHTML = STP5;
    document.getElementById("RES5").innerHTML = " ";
}
// ////////////////////////////////// Заметки ////////////////////////////
// .................... 1 строка.................................
function zmet1(){
    let met1 = `
    <div class="form-floating" style="width: 276px; height: 62px; top:180px; right:20px" >
    <textarea class="form-control"  placeholder="Leave a comment here" id="floatingTextarea2" ></textarea>
    <label for="floatingTextarea2">Заметка для данного процесса</label>
    <button type="button"  class="btn btn-primary" style="margin-left: 0px; background:rgb(13, 110, 253); width: 105px; height: 38px; margin-top: 0px;">Сохранить</button>
    </div>     
    `;
    // onclick="style.display='none'"
    document.getElementById("met1").innerHTML = met1;
}
// ///////////////////////////////////// Добавление строки /////////////////////////////////////////////
var i_elcnt = 0;
function addstok(){
    var node = document.createElement('tr');
   
    i_elcnt++;
    node.innerHTML =` 
            <tr style="height: 48px;">
              <th scope="row" style="padding-left: 40px; padding-top: 15px;">1</th>         
          
              <td style="padding-top: 15px;">10.30.44.15:23678 </td>
              <td style="color: rgb(196, 196, 196);padding-top: 15px;">нет резерва</td>

                 
              <td style="width: 117px; height: 24px;">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="width: 117px; height: 24px; padding-top: 9px;" >
                 
                  
                    <div type="button" onclick="closerow()" style="width: 24px; height: 24px;">
                    <img src="imag/trash2.svg" alt="" style="width: 24px; height: 24px;">
                    </div>
                    <div type="button" onclick="zmet11()" style="width: 24px; height: 24px;">
                    <img src="imag/file-earmark.svg" onclick='this.src="imag/file-earmark_G.svg"' alt="" style="width: 24px; height: 24px;">
                    </div>               

                </div>
              </td>
            </tr>           
        `;
        
    document.getElementById("newcol").appendChild(node);
    
   }

//    ////////////////////////  Удаление строки /////////////////////////////////

function closerow(){
    var tbody = document.getElementById('newcol');
    tbody.removeChild(tbody.firstElementChild);
}
// ///////////////////////// Добавление заметок в модальном окне //////////////////////
function zmet11(){
    let met11 = `
    <div class="col-1">
    <div class="form-floating" style="width: 260px;height: 62px;top: 40px;right: 5px;left: -5px;left: 5px;" >
  <textarea class="form-control"  placeholder="Leave a comment here" id="floatingTextarea2" ></textarea>
  <label for="floatingTextarea2">Заметка для данного процесса</label>
  <button type="button"  class="btn btn-primary" style="margin-left: 0px; background:rgb(13, 110, 253); width: 105px; height: 38px; margin-top: 0px;">Сохранить</button>
  </div> 
</div>     
    `;
    
    document.getElementById("met11").innerHTML = met11;
}

// ///////////////////// ФОРМА АВТОРИЗАЦИИ /////////////////////////////////
