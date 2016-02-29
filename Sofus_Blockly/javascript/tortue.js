var Tortue;
var SVG, dessineSegment, dessineTexte, effaceDessin;
var axeX, axeY, axes, grille;

SVG = function(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
};

effaceDessin = function() {
  var dessin;
  dessin = $("#leSVG");
  return dessin.empty();
};

dessineSegment = function(x1, y1, x2, y2, couleur) {
  var dessin;
  if (x1 == null) {
    x1 = 0;
  }
  if (y1 == null) {
    y1 = 0;
  }
  if (x2 == null) {
    x2 = 1;
  }
  if (y2 == null) {
    y2 = 1;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessin = $("#leSVG");
  return $(SVG('line')).attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', couleur).attr('stroke-width', 1).appendTo(dessin);
};
dessineTexte = function(texte, x, y, couleur) {
  var dessin;
  if (x == null) {
    x = 20;
  }
  if (y == null) {
    y = 20;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessin = $("#leSVG");
  return $(SVG('text')).attr('x', x).attr('y', y).attr('fill', couleur).text(texte).appendTo(dessin);
};

dessineCercle = function(cx, cy, r, couleur) {
  var dessin;
  if (cx == null) {
    cx = 0;
  }
  if (cy == null) {
    cy = 0;
  }
  if (r == null) {
    r = 5;
  }
  if (couleur == null) {
    couleur = 'red';
  }
  dessin = $("#leSVG");
  return $(SVG('circle')).attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', couleur).attr('fill-opacity', 0.4).attr('stroke', couleur).attr('stroke-width', 1).appendTo(dessin);
};

axeX = function(){
	dessineSegment(20,240,620,240,"black");
	dessineSegment(620,240,600,234,"black");
	dessineSegment(620,240,600,246,"black");
for(var x=-300;x<300;x+=10){
	if(Math.abs(x)%50>0) { 
		dessineSegment(320+x,242,320+x,238,"black");
	} else {
		if(Math.abs(x)%100>0){
			dessineSegment(320+x,244,320+x,236,"black");
		}  else {
			dessineSegment(320+x,245,320+x,235,"black");
			dessineTexte(x,320+x,260)
		}
	}
}

}




axeY = function(){
	dessineSegment(320,440,320,40,"black");
	dessineSegment(320,40,314,60,"black");
	dessineSegment(320,40,326,60,"black");
	for(var y=-200;y<200;y+=10){
		if(Math.abs(y)%50>0){
			dessineSegment(318,240-y,322,240-y,"black");
		} else {
			if(Math.abs(y)%100>0) {
				dessineSegment(316,240-y,324,240-y,"black");
			} else {
				dessineSegment(315,240-y,325,240-y,"black");
				dessineTexte(y,322,240-y);
			}
		}
	}


}

grille = function(){
	for(var x = -300; x <= 300; x += 10) {
		if (Math.abs(x)%50>0){
			dessineSegment(320+x,40,320+x,440,"yellow");
		} else {
			dessineSegment(320+x,40,320+x,440,"orange");
		}
	}
	for(var y = -200; y <= 200; y += 10) {
		if (Math.abs(y)%50>0){
			dessineSegment(20,240-y,620,240-y,"yellow");
		} else {
			dessineSegment(20,240-y,620,240-y,"orange");
		}
	}
}




axes = function(){
	axeX();
	axeY();
}






Tortue = (function() {
  function Tortue() {
    this.x = 320;
    this.y = 240;
    this.t = 0;
    this.c = "#000066";
    this.stylo = true;
  }

  Tortue.prototype.penup = function() {
    return this.stylo = false;
  };

  Tortue.prototype.pendown = function() {
    return this.stylo = true;
  };

  Tortue.prototype.couleur = function(coul) {
    return this.c = coul;
  };

  Tortue.prototype.tg = function(a) {
    return this.t -= a / 180 * Math.PI;
  };

  Tortue.prototype.td = function(a) {
    return this.t += a / 180 * Math.PI;
  };

  Tortue.prototype.orient = function(a) {
    return this.t = a / 180 * Math.PI;
  };

  Tortue.prototype.write = function(texte) {
    return dessineTexte(texte, this.x, this.y, this.c);
  };

  Tortue.prototype.cercle = function() {
    return dessineCercle(this.x, this.y, 4, this.c);
  };

  Tortue.prototype.av = function(d) {
    var oldx, oldy;
    oldx = this.x;
    oldy = this.y;
    this.x += d * Math.cos(this.t);
    this.y += d * Math.sin(this.t);
    if (this.stylo) {
      return dessineSegment(oldx, oldy, this.x, this.y, this.c);
    }
  };

  Tortue.prototype.re = function(d) {
    var oldx, oldy;
    oldx = this.x;
    oldy = this.y;
    this.x -= d * Math.cos(this.t);
    this.y -= d * Math.sin(this.t);
    if (this.stylo) {
      return dessineSegment(oldx, oldy, this.x, this.y, this.c);
    }
  };

  Tortue.prototype.teleport = function(x, y) {
    this.x = x;
    return this.y = y;
  };

  return Tortue;

})();

toto1 = new Tortue;
