onload = function(){
    console.log("comecando...");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.getElementById("btn1").addEventListener("click", grayScale);
    document.getElementById("btn2").addEventListener("click", gaussianFilter);
    document.getElementById("btn3").addEventListener("click", sobelFilter);
    document.getElementById("btn4").addEventListener("click", colorInvert);
    document.getElementById("btn5").addEventListener("click", laplacianFilter);

}

function onButtonColor(btn){
    document.getElementById(btn).style.backgroundColor = "#00FFFF";
}

function offButtonColor(btn){
    document.getElementById(btn).style.backgroundColor = "white";
}

function onShowImage(img){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

function colorInvert(){
    console.log("invertendo cores...");
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}


function grayScale(){
    console.log("convertendo para tons de cinza...");
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  
    //Luminosidade = R*0.3 + G*0.59 + B *0.11
   for (i = 0; i < imgData.data.length; i += 4) {
       let luminosidade = imgData.data[i]*0.3 + imgData.data[i+1]*0.59 + imgData.data[i+2]*0.11;

        imgData.data[i] = luminosidade;
        imgData.data[i+1] = luminosidade;
        imgData.data[i+2] = luminosidade;
        //imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
} 

function indice(x,y,width){
    return y * (width * 4) + x * 4;
}

function gaussianFilter(){
    console.log("aplicando filtro gaussiano...");
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var imgMod = imgData.data.slice();
    var i;

    var rSum = 0.0;
    var gSum = 0.0;
    var bSum = 0.0;

    for(let y = 1; y < canvas.height -1; ++y ){
        for(let x = 1; x < canvas.width-1; ++x){

            rSum = 0.0;
            gSum = 0.0;
            bSum = 0.0;

            let r = [];
            let g = [];
            let b = [];

            r.push(imgData.data[indice(x-1,y-1,canvas.width)]*0.0625);
            g.push(imgData.data[indice(x-1,y-1,canvas.width)+1]*0.0625);
            b.push(imgData.data[indice(x-1,y-1,canvas.width)+2]*0.0625);

            r.push(imgData.data[indice(x-1,y,canvas.width)]*0.125);
            g.push(imgData.data[indice(x-1,y,canvas.width)+1]*0.125);
            b.push(imgData.data[indice(x-1,y,canvas.width)+2]*0.125);

            r.push(imgData.data[indice(x-1,y+1,canvas.width)]*0.0625);
            g.push(imgData.data[indice(x-1,y+1,canvas.width)+1]*0.0625);
            b.push(imgData.data[indice(x-1,y+1,canvas.width)+2]*0.0625);

            r.push(imgData.data[indice(x,y-1,canvas.width)]*0.125);
            g.push(imgData.data[indice(x,y-1,canvas.width)+1]*0.125);
            b.push(imgData.data[indice(x,y-1,canvas.width)+2]*0.125);

            r.push(imgData.data[indice(x,y,canvas.width)]*0.25);
            g.push(imgData.data[indice(x,y,canvas.width)+1]*0.25);
            b.push(imgData.data[indice(x,y,canvas.width)+2]*0.25);

            r.push(imgData.data[indice(x,y+1,canvas.width)]*0.125);
            g.push(imgData.data[indice(x,y+1,canvas.width)+1]*0.125);
            b.push(imgData.data[indice(x,y+1,canvas.width)+2]*0.125);

            r.push(imgData.data[indice(x+1,y-1,canvas.width)]*0.0625);
            g.push(imgData.data[indice(x+1,y-1,canvas.width)+1]*0.0625);
            b.push(imgData.data[indice(x+1,y-1,canvas.width)+2]*0.0625);

            r.push(imgData.data[indice(x+1,y,canvas.width)]*0.125);
            g.push(imgData.data[indice(x+1,y,canvas.width)+1]*0.125);
            b.push(imgData.data[indice(x+1,y,canvas.width)+2]*0.125);

            r.push(imgData.data[indice(x+1,y+1,canvas.width)]*0.0625);
            g.push(imgData.data[indice(x+1,y+1,canvas.width)+1]*0.0625);
            b.push(imgData.data[indice(x+1,y+1,canvas.width)+2]*0.0625);

            for(i = 0; i < r.length; i++){
                rSum += r[i];
                gSum += g[i];
                bSum += b[i];
            }

            imgMod[indice(x,y,canvas.width)] = rSum;
            imgMod[indice(x,y,canvas.width)+1] = gSum;
            imgMod[indice(x,y,canvas.width)+2] = bSum;

        }
    }
    

    for(i = 0; i < imgData.data.length; i++){
        imgData.data[i] = imgMod[i];
    }

    ctx.putImageData(imgData, 0, 0);
  
}

function sobelFilter(){
    console.log("aplicando filtro sobel...");
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        let luminosidade = imgData.data[i]*0.3 + imgData.data[i+1]*0.59 + imgData.data[i+2]*0.11;
 
         imgData.data[i] = luminosidade;
         imgData.data[i+1] = luminosidade;
         imgData.data[i+2] = luminosidade;
         //imgData.data[i+3] = 255;
     }

    var imgMod = imgData.data.slice();

    var rxSum = 0.0;
    var gxSum = 0.0;
    var bxSum = 0.0;

    var rySum = 0.0;
    var gySum = 0.0;
    var bySum = 0.0;

    for(let y = 1; y < canvas.height -1; ++y ){
        for(let x = 1; x < canvas.width-1; ++x){

            rxSum = 0.0;
            gxSum = 0.0;
            bxSum = 0.0;

            let rx = [];
            let gx = [];
            let bx = [];

            rx.push(imgData.data[indice(x-1,y-1,canvas.width)]* -1.0);
            gx.push(imgData.data[indice(x-1,y-1,canvas.width)+1]* -1.0);
            bx.push(imgData.data[indice(x-1,y-1,canvas.width)+2]* -1.0);

            rx.push(imgData.data[indice(x-1,y+1,canvas.width)]);
            gx.push(imgData.data[indice(x-1,y+1,canvas.width)+1]);
            bx.push(imgData.data[indice(x-1,y+1,canvas.width)+2]);

            rx.push(imgData.data[indice(x,y-1,canvas.width)]* -2.0);
            gx.push(imgData.data[indice(x,y-1,canvas.width)+1]* -2.0);
            bx.push(imgData.data[indice(x,y-1,canvas.width)+2]* -2.0);

            rx.push(imgData.data[indice(x,y+1,canvas.width)]*2.0);
            gx.push(imgData.data[indice(x,y+1,canvas.width)+1]*2.0);
            bx.push(imgData.data[indice(x,y+1,canvas.width)+2]*2.0);

            rx.push(imgData.data[indice(x+1,y-1,canvas.width)]* -1.0);
            gx.push(imgData.data[indice(x+1,y-1,canvas.width)+1]* -1.0);
            bx.push(imgData.data[indice(x+1,y-1,canvas.width)+2]* -1.0);

            rx.push(imgData.data[indice(x+1,y+1,canvas.width)]);
            gx.push(imgData.data[indice(x+1,y+1,canvas.width)+1]);
            bx.push(imgData.data[indice(x+1,y+1,canvas.width)+2]);

            for(i = 0; i < rx.length; i++){
                rxSum += rx[i];
                gxSum += gx[i];
                bxSum += bx[i];
            }


            rySum = 0.0;
            gySum = 0.0;
            bySum = 0.0;

            let ry = [];
            let gy = [];
            let by = [];

            ry.push(imgData.data[indice(x-1,y-1,canvas.width)]);
            gy.push(imgData.data[indice(x-1,y-1,canvas.width)+1]);
            by.push(imgData.data[indice(x-1,y-1,canvas.width)+2]);

            ry.push(imgData.data[indice(x-1,y,canvas.width)]* 2.0);
            gy.push(imgData.data[indice(x-1,y,canvas.width)+1]* 2.0);
            by.push(imgData.data[indice(x-1,y,canvas.width)+2]* 2.0);

            ry.push(imgData.data[indice(x-1,y+1,canvas.width)]);
            gy.push(imgData.data[indice(x-1,y+1,canvas.width)+1]);
            by.push(imgData.data[indice(x-1,y+1,canvas.width)+2]);

            ry.push(imgData.data[indice(x+1,y-1,canvas.width)]* -1.0);
            gy.push(imgData.data[indice(x+1,y-1,canvas.width)+1]* -1.0);
            by.push(imgData.data[indice(x+1,y-1,canvas.width)+2]* -1.0);

            ry.push(imgData.data[indice(x+1,y,canvas.width)]* -2.0);
            gy.push(imgData.data[indice(x+1,y,canvas.width)+1]* -2.0);
            by.push(imgData.data[indice(x+1,y,canvas.width)+2]* -2.0);

            ry.push(imgData.data[indice(x+1,y+1,canvas.width)]* -1.0);
            gy.push(imgData.data[indice(x+1,y+1,canvas.width)+1]* -1.0);
            by.push(imgData.data[indice(x+1,y+1,canvas.width)+2]* -1.0);

            for(i = 0; i < ry.length; i++){
                rySum += ry[i];
                gySum += gy[i];
                bySum += by[i];
            }

            let rGrad = Math.sqrt((rxSum*rxSum) + (rySum*rySum));
            let gGrad = Math.sqrt((gxSum*gxSum) + (gySum*gySum));
            let bGrad = Math.sqrt((bxSum*bxSum) + (bySum*bySum));

            imgMod[indice(x,y,canvas.width)] = rGrad;
            imgMod[indice(x,y,canvas.width)+1] = gGrad;
            imgMod[indice(x,y,canvas.width)+2] = bGrad;

        }
    }

    for(let i = 0; i < imgData.data.length; i++){
        imgData.data[i] = imgMod[i];
    }

    ctx.putImageData(imgData, 0, 0);

}

function laplacianFilter(){
    console.log("aplicando filtro laplaciano...");

    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);

    for (i = 0; i < imgData.data.length; i += 4) {
        let luminosidade = imgData.data[i]*0.3 + imgData.data[i+1]*0.59 + imgData.data[i+2]*0.11;
 
         imgData.data[i] = luminosidade;
         imgData.data[i+1] = luminosidade;
         imgData.data[i+2] = luminosidade;
         //imgData.data[i+3] = 255;
     }

    var imgMod = imgData.data.slice();
    var i;

    var rSum = 0.0;
    var gSum = 0.0;
    var bSum = 0.0;

    for(let y = 1; y < canvas.height -1; ++y ){
        for(let x = 1; x < canvas.width-1; ++x){

            rSum = 0.0;
            gSum = 0.0;
            bSum = 0.0;

            let r = [];
            let g = [];
            let b = [];

            r.push(imgData.data[indice(x-1,y,canvas.width)]* -1.0);
            g.push(imgData.data[indice(x-1,y,canvas.width)+1]* -1.0);
            b.push(imgData.data[indice(x-1,y,canvas.width)+2]* -1.0);

            r.push(imgData.data[indice(x,y-1,canvas.width)]* -1.0);
            g.push(imgData.data[indice(x,y-1,canvas.width)+1]* -1.0);
            b.push(imgData.data[indice(x,y-1,canvas.width)+2]* -1.0);

            r.push(imgData.data[indice(x,y,canvas.width)]* 4.0);
            g.push(imgData.data[indice(x,y,canvas.width)+1]* 4.0);
            b.push(imgData.data[indice(x,y,canvas.width)+2]* 4.0);

            r.push(imgData.data[indice(x,y+1,canvas.width)]*-1.0);
            g.push(imgData.data[indice(x,y+1,canvas.width)+1]*-1.0);
            b.push(imgData.data[indice(x,y+1,canvas.width)+2]*-1.0);

            r.push(imgData.data[indice(x+1,y,canvas.width)]* -1.0);
            g.push(imgData.data[indice(x+1,y,canvas.width)+1]* -1.0);
            b.push(imgData.data[indice(x+1,y,canvas.width)+2]* -1.0);

            for(i = 0; i < r.length; i++){
                rSum += r[i];
                gSum += g[i];
                bSum += b[i];
            }

            imgMod[indice(x,y,canvas.width)] = rSum;
            imgMod[indice(x,y,canvas.width)+1] = gSum;
            imgMod[indice(x,y,canvas.width)+2] = bSum;

        }
    }
    

    for(i = 0; i < imgData.data.length; i++){
        imgData.data[i] = imgMod[i];
    }

    ctx.putImageData(imgData, 0, 0);

}