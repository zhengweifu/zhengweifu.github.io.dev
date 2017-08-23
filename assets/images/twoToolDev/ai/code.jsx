$._ext_ILST = {};


// 翻转路径
$._ext_ILST.rolloverPath = function(_pathItem) {
    var _pathPoints = [], i;
    for(i=0; i<_pathItem.pathPoints.length; i++) {
        _pathPoints.push({anchor:[_pathItem.pathPoints[i].anchor[0], _pathItem.pathPoints[i].anchor[1]],
                        leftDirection : [_pathItem.pathPoints[i].rightDirection[0], _pathItem.pathPoints[i].rightDirection[1]],
                        rightDirection : [_pathItem.pathPoints[i].leftDirection[0], _pathItem.pathPoints[i].leftDirection[1]]});
    }
    _pathPoints = _pathPoints.reverse();
    for(i=0; i<_pathItem.pathPoints.length; i++) {
        _pathItem.pathPoints[i].anchor = _pathPoints[i].anchor;
        _pathItem.pathPoints[i].leftDirection = _pathPoints[i].leftDirection;
        _pathItem.pathPoints[i].rightDirection = _pathPoints[i].rightDirection;
    }
};

// 翻转所有逆时针路径
$._ext_ILST.filpPaths = function() {
	var path_items = app.activeDocument.pathItems;
	for(var i=0; i<path_items.length; i++) {
		if(path_items[i].area < 0) $._ext_ILST.rolloverPath(path_items[i]);
	}
};


$._ext_ILST.DividePath = {
	startPoints : [],
	endPoints : [],
	
	// 清除开始和结束的店
	clear : function() {
		startPoints = [];
		endPoints = [];
	},


	// 得到当前选择的点
	getSelectionPoints : function() {
		if(!app.activeDocument) {
			alert("没有被激活的文档.");
			return null;
		}
	    var selection = app.activeDocument.selection;
	    if(selection.length === 0) {
	        alert("没有路径被选择.");
	        return null;
	    }

	    var i;
	    if(selection[0].typename === "PathItem") {
            // 如果路径反向, 翻转路径
            if(selection[0].area < 0) $._ext_ILST.rolloverPath(selection[0]);
	        
            var selectionPoints = [],
	        	o_sel_length = selection[0].selectedPathPoints.length;
	        for(i=0; i<o_sel_length; i++) {
	            if(selection[0].selectedPathPoints[i].selected === PathPointSelection.ANCHORPOINT) {
	                selectionPoints.push(selection[0].selectedPathPoints[i]);
	            }
	        }

	        if(selectionPoints.length < 2) {
	            alert("选择的锚点数不能少于2");
	            return null;
	        } else {
	            return selectionPoints;
	        }
	    }
	    
	    return null;
	},
	
	// 设置开始点
	start : function() {
		var selPoints = this.getSelectionPoints();
		if(selPoints) {
            this.startPoints = selPoints;
            return this.startPoints.length;
        } else {
            return 0;
        }
	},
	
	// 设置结束点
	end : function() {
		var selPoints = this.getSelectionPoints();
		if(selPoints) {
            this.endPoints = selPoints;
            return this.endPoints.length;
        } else {
            return 0;
        }
	}
};

// $._ext_ILST.DividePath.start();
// test create a document and create a test path
 $._ext_ILST.DividePath.test = function() {
     var doc = app.documents.add(DocumentColorSpace.RGB),
         pathItem = doc.pathItems.add(),
         p1 = pathItem.pathPoints.add(),
         p2 = pathItem.pathPoints.add(),
         p3 = pathItem.pathPoints.add(),
         p4 = pathItem.pathPoints.add();
         // p5 = pathItem.pathPoints.add(),
         // p6 = pathItem.pathPoints.add();
     pathItem.stroket = true;

     p1.anchor = [50, 150];
     // p1.anchor = [0, 90];
     // p1.leftDirection = p1.rightDirection = p1.anchor;
     p1.leftDirection = [40, 120];
     p1.rightDirection = [80, 150];

     p2.anchor = [150, 100];
     // p2.anchor = [90, 90];
     // p2.leftDirection = p2.rightDirection = p2.anchor;
     p2.leftDirection = [120, 120];
     p2.rightDirection = [120, 70];

     p3.anchor = [100, 50];
     // p3.anchor = [120, 45];
     // p3.leftDirection = p3.rightDirection = p3.anchor;
     p3.leftDirection = [120, 60];
     p3.rightDirection = [80, 40];

     p4.anchor = [30, 80];
     // p4.anchor = [90, 0];
     // p4.leftDirection = p4.rightDirection = p4.anchor;
     p4.leftDirection = [40, 50];
     p4.rightDirection = [30, 100];


     // p5.anchor = [0, 0];
     // p5.leftDirection = p5.rightDirection = p5.anchor;

     // p6.anchor = [30, 45];
     // p6.leftDirection = p6.rightDirection = p6.anchor;

     pathItem.closed = true;
     pathItem.filled = false;

     // this.startPoints = [p2, p3, p4];
     // this.endPoints = [p1, p5, p6];

     // this.startPoints = [p1, p2];
     // this.endPoints = [p4, p5];
     this.startPoints = [p1, p2];
     this.endPoints = [p3, p4];

     return [p1, p2, p3, p4];
 };
//$._ext_ILST.DividePath.test = function() {
//    var doc = app.documents.add(DocumentColorSpace.RGB),
//        pathItem = doc.pathItems.add(),
//        p1 = pathItem.pathPoints.add(),
//        p2 = pathItem.pathPoints.add(),
//        p3 = pathItem.pathPoints.add(),
//        p4 = pathItem.pathPoints.add();
//        p5 = pathItem.pathPoints.add(),
//        p6 = pathItem.pathPoints.add();
//    pathItem.stroket = true;
//
//    p1.anchor = [20, 100];
//    p1.leftDirection = p1.rightDirection = p1.anchor;
//
//
//    p2.anchor = [80, 100];
//    p2.leftDirection = p2.rightDirection = p2.anchor;
//
//
//    p3.anchor = [60, 50];
//    p3.leftDirection = p3.rightDirection = p3.anchor;
//
//
//    p4.anchor = [80, 0];
//    p4.leftDirection = p4.rightDirection = p4.anchor;
// 
//
//
//    p5.anchor = [20, 0];
//    p5.leftDirection = p5.rightDirection = p5.anchor;
//
//    p6.anchor = [0, 50];
//    p6.leftDirection = p6.rightDirection = p6.anchor;
//
//    pathItem.closed = true;
//    pathItem.filled = false;
//
//    this.startPoints = [p1, p2];
//    this.endPoints = [p4, p5];
//
//    return [p1, p2, p3, p4, p5, p6];
//};

$._ext_ILST.DividePath.indexOf = function(list, element) {
    for(var i=0; i<list.length; i++) {
        if(list[i] === element) return i;
    }

    return -1;
};

// Point class
$._ext_ILST.DividePath.Point = function(x, y) {
    this.set(x, y);
};

$._ext_ILST.DividePath.Point.prototype = {
    set : function(_x, _y) {
        if(_x !== undefined) this.x = _x;
        else this.x = 0;
        if(_y !== undefined) this.y = _y;
        else this.y = 0;
    },

    copy : function(point) {
        this.x = point.x;
        this.y = point.y;
    },

    clone : function() {
        var outputPoint = new $._ext_ILST.DividePath.Point();
        outputPoint.set(this.x, this.y);
        return outputPoint;
    },

    add : function(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    },

    sub : function(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    },

    multiply: function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    },

    multiplyScalar: function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    },

    divide: function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    },

    divideScalar: function (scalar) {
        if ( scalar !== 0 ) {
            var invScalar = 1 / scalar;
            this.x *= invScalar;
            this.y *= invScalar;
        } else {
            this.x = 0;
            this.y = 0;
        }
        return this;
    },

    distanceTo: function ( v ) {

        return Math.sqrt( this.distanceToSquared( v ) );

    },

    distanceToSquared: function ( v ) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    }
};


// Line class
$._ext_ILST.DividePath.Line = function(p1, p2) {
    this.set(p1, p2);
};

$._ext_ILST.DividePath.Line.prototype.clone = function () {
    var _line = new $._ext_ILST.DividePath.Line();
    _line.point1.copy(this.point1);
    _line.point2.copy(this.point2);
    return _line;
};

$._ext_ILST.DividePath.Line.prototype.getLength = function () {
    return this.point1.distanceTo(this.point2);
};

$._ext_ILST.DividePath.Line.prototype.set = function(p1, p2) {
    if(p1 !== undefined) this.point1 = p1;
    else this.point1 = new $._ext_ILST.DividePath.Point();

    if(p2 !== undefined) this.point2 = p2;
    else this.point2 = new $._ext_ILST.DividePath.Point();
};

$._ext_ILST.DividePath.Line.prototype.getPoint = function ( t ) {

    var point = this.point2.clone().sub(this.point1);
    point.multiplyScalar( t ).add( this.point1 );

    return point;

};

$._ext_ILST.DividePath.Line.prototype.getPointAt = function ( u ) {
    return this.getPoint(u);
};

$._ext_ILST.DividePath.Line.prototype.getPoints = function ( ts ) { // ts is Array
    var tlens = ts.length, i, result = [[null, this.point1.clone(), null, false], [null, this.point2.clone(), null, false]];

    for(i=0; i<tlens; i++) {
        if(ts[i]<=0 || ts[i]>=1) {
            if(ts[i] <= 0) result[0][3] = true;
            else result[result.length-1][3] = true;
           continue; 
        }
        result.splice(result.length-1, 0, [null, this.getPoint(ts[i]), null, true]);
    }

    return result;
};

$._ext_ILST.DividePath.Line.prototype.getIntersectionPoint = function(line) {
    var nolecular = (this.point2.x - line.point2.x) * (line.point1.y - line.point2.y) - (this.point2.y - line.point2.y) * (line.point1.x - line.point2.x),
        denominator = (this.point1.y - this.point2.y) * (line.point1.x - line.point2.x) - (this.point1.x - this.point2.x) * (line.point1.y - line.point2.y); 
    
    if(denominator === 0) return null;
    
    var t = nolecular / denominator;

    if(t>=0 && t<=1) {
        // var _x = this.point1.x * t + this.point2.x * (1 - t),
        //     _y = this.Point1.y * t + this.Point2.y * (1-t);
        // return {"domain" : t,  "point" : new $._ext_ILST.DividePath.Point(_x, _y)};
        return 1-t;
    } else {
        return null;
    }
};

// CubeBezier class
$._ext_ILST.DividePath.CubeBezier = function(p1, p2, p3, p4) {
    this.set(p1, p2, p3, p4);
    this.segments = 200;
    this.points = [];
    this.divide();
};

// Get total curve arc length
$._ext_ILST.DividePath.CubeBezier.prototype.getLength = function () {

    var lengths = this.getLengths();
    return lengths[ lengths.length - 1 ];

};

// Get list of cumulative segment lengths
$._ext_ILST.DividePath.CubeBezier.prototype.getLengths = function ( divisions ) {

    if ( ! divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;

    if ( this.cacheArcLengths
        && ( this.cacheArcLengths.length == divisions + 1 )
        && ! this.needsUpdate) {

        //console.log( "cached", this.cacheArcLengths );
        return this.cacheArcLengths;

    }

    this.needsUpdate = false;

    var cache = [];
    var current, last = this.getPoint( 0 );
    var p, sum = 0;

    cache.push( 0 );

    for ( p = 1; p <= divisions; p ++ ) {

        current = this.getPoint ( p / divisions );
        sum += current.distanceTo( last );
        cache.push( sum );
        last = current;

    }

    this.cacheArcLengths = cache;

    return cache; // { sums: cache, sum:sum }; Sum is in the last element.

};

$._ext_ILST.DividePath.CubeBezier.prototype.getUtoTmapping = function ( u, distance ) {

    var arcLengths = this.getLengths();

    var i = 0, il = arcLengths.length;

    var targetArcLength; // The targeted u distance value to get

    if ( distance ) {

        targetArcLength = distance;

    } else {

        targetArcLength = u * arcLengths[ il - 1 ];

    }

    //var time = Date.now();

    // binary search for the index with largest value smaller than target u distance

    var low = 0, high = il - 1, comparison;

    while ( low <= high ) {

        i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

        comparison = arcLengths[ i ] - targetArcLength;

        if ( comparison < 0 ) {

            low = i + 1;
            continue;

        } else if ( comparison > 0 ) {

            high = i - 1;
            continue;

        } else {

            high = i;
            break;

            // DONE

        }

    }

    i = high;

    //console.log('b' , i, low, high, Date.now()- time);

    if ( arcLengths[ i ] == targetArcLength ) {

        var t = i / ( il - 1 );
        return t;

    }

    // we could get finer grain at lengths, or use simple interpolatation between two points

    var lengthBefore = arcLengths[ i ];
    var lengthAfter = arcLengths[ i + 1 ];

    var segmentLength = lengthAfter - lengthBefore;

    // determine where we are between the 'before' and 'after' points

    var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

    // add that fractional amount to t

    var t = ( i + segmentFraction ) / ( il -1 );

    return t;

};

$._ext_ILST.DividePath.CubeBezier.prototype.set = function(p1, p2, p3, p4) {
    if(p1 !== undefined) this.point1 = p1;
    else this.point1 = new $._ext_ILST.DividePath.Point();

    if(p2 !== undefined) this.point2 = p2;
    else this.point2 = new $._ext_ILST.DividePath.Point();

    if(p3 !== undefined) this.point3 = p3;
    else this.point3 = new $._ext_ILST.DividePath.Point();

    if(p4 !== undefined) this.point4 = p4;
    else this.point4 = new $._ext_ILST.DividePath.Point();
};

$._ext_ILST.DividePath.CubeBezier.prototype.getPosition = function(t) {
    var p01 = new $._ext_ILST.DividePath.Point(),
        p12 = new $._ext_ILST.DividePath.Point(),
        p23 = new $._ext_ILST.DividePath.Point(),
        p012 = new $._ext_ILST.DividePath.Point(),
        p123 = new $._ext_ILST.DividePath.Point(),
        p0123 = new $._ext_ILST.DividePath.Point();

    var output = {
        "p01" : p01,
        "p12" : p12,
        "p23" : p23,
        "p012" : p012,
        "p123" : p123,
        "p0123" : p0123
    };

    p01.copy(this.point2);
    p01.sub(this.point1).multiplyScalar(t).add(this.point1);

    p12.copy(this.point3);
    p12.sub(this.point2).multiplyScalar(t).add(this.point2);

    p23.copy(this.point4);
    p23.sub(this.point3).multiplyScalar(t).add(this.point3);

    p012.copy(p12);
    p012.sub(p01).multiplyScalar(t).add(p01);

    p123.copy(p23);
    p123.sub(p12).multiplyScalar(t).add(p12);

    
    p0123.copy(p123);
    p0123.sub(p012).multiplyScalar(t).add(p012);

    return output;
};

$._ext_ILST.DividePath.CubeBezier.prototype.getPoint = function(t) {
    return this.getPosition(t)["p0123"];
};

$._ext_ILST.DividePath.CubeBezier.prototype.getPointAt = function(u) {
    var t = this.getUtoTmapping(u);
    return this.getPosition(t)["p0123"];
};

$._ext_ILST.DividePath.CubeBezier.prototype.getPoints = function(ts) { // ts is Array
    var tlens = ts.length, i, tempt, tempout, upt=0,
        result = [[null, this.point1.clone(), this.point2.clone(), false], [this.point3.clone(), this.point4.clone(), null, false]],
        tempCubeBezier = new $._ext_ILST.DividePath.CubeBezier();
    for(i=0; i<tlens; i++) {
        if(ts[i] <= 0 || ts[i] >= 1) {
            if(ts[i] <= 0) result[0][3] = true;
            else result[result.length-1][3] = true;
            continue;
        }
        tempCubeBezier.set(result[i][1], result[i][2], result[result.length-1][0], result[result.length-1][1]);
        tempCubeBezier.divide();
        tempt = (ts[i] - upt) / (1 - upt);
        tempout = tempCubeBezier.getPosition(tempt);
        result[i][2].copy(tempout["p01"]);
        result[result.length-1][0].copy(tempout["p23"]);
        result.splice(result.length-1, 0, [tempout["p012"], tempout["p0123"], tempout["p123"], true]); 
        upt = ts[i];
    }

    return result;
};

$._ext_ILST.DividePath.CubeBezier.prototype.divide = function() {
    this.points.length = 0;
    for(var t=0; t<=1; t+=1/this.segments) {
        if(t === 0) this.points.push([0, this.point1.clone()]);
        else if(t=== 1) this.points.push([1, this.point4.clone()]);
        else {
            this.points.push([t, this.getPosition(t)["p0123"]]);
        }
    }
};

$._ext_ILST.DividePath.CubeBezier.prototype.getIntersectionPoint = function(line) {
    var tempLine = new $._ext_ILST.DividePath.Line();
    var t = null;
    for(var i=0; i<this.points.length-1; i++) {
        tempLine.set(this.points[i][1], this.points[i+1][1]);
        t = tempLine.getIntersectionPoint(line);
        if(t !== null) {
            return this.points[i][0] + t / this.segments;
            // return {
            //     "domain" : this.points[i][0] + intersectionPoint["domain"] / this.segments,
            //     "point" : intersectionPoint["point"]
            // };
        }
    }

    return null;
};

// Path base class
$._ext_ILST.DividePath.Path = function(points) {
    this.curves = [];
    this.actions = [];
    if(points) {
        this.fromPoints(points);
    }
};

$._ext_ILST.DividePath.PathActions = {

    MOVE_TO: 'moveTo',
    LINE_TO: 'lineTo',
    BEZIER_CURVE_TO: 'bezierCurveTo'

};

$._ext_ILST.DividePath.Path.prototype.fromPoints = function ( points ) {

    this.moveTo( points[ 0 ].x, points[ 0 ].y );

    for ( var v = 1, vlen = points.length; v < vlen; v ++ ) {

        this.lineTo( points[ v ].x, points[ v ].y );

    };

};

$._ext_ILST.DividePath.Path.prototype.moveTo = function ( x, y ) {

    var args = Array.prototype.slice.call( arguments );
    this.actions.push( { action: $._ext_ILST.DividePath.PathActions.MOVE_TO, args: args } );

};

$._ext_ILST.DividePath.Path.prototype.lineTo = function ( x, y ) {

    var args = Array.prototype.slice.call( arguments );

    var lastargs = this.actions[ this.actions.length - 1 ].args;

    var x0 = lastargs[ lastargs.length - 2 ];
    var y0 = lastargs[ lastargs.length - 1 ];

    var curve = new $._ext_ILST.DividePath.Line( new $._ext_ILST.DividePath.Point( x0, y0 ), new $._ext_ILST.DividePath.Point( x, y ) );
    this.curves.push( curve );

    this.actions.push( { action: $._ext_ILST.DividePath.PathActions.LINE_TO, args: args } );

};

$._ext_ILST.DividePath.Path.prototype.bezierCurveTo = function( aCP1x, aCP1y,
                                               aCP2x, aCP2y,
                                               aX, aY ) {

    var args = Array.prototype.slice.call( arguments );

    var lastargs = this.actions[ this.actions.length - 1 ].args;

    var x0 = lastargs[ lastargs.length - 2 ];
    var y0 = lastargs[ lastargs.length - 1 ];

    var curve = new $._ext_ILST.DividePath.CubeBezier( new $._ext_ILST.DividePath.Point( x0, y0 ),
                                            new $._ext_ILST.DividePath.Point( aCP1x, aCP1y ),
                                            new $._ext_ILST.DividePath.Point( aCP2x, aCP2y ),
                                            new $._ext_ILST.DividePath.Point( aX, aY ) );
    this.curves.push( curve );

    this.actions.push( { action: $._ext_ILST.DividePath.PathActions.BEZIER_CURVE_TO, args: args } );

};

$._ext_ILST.DividePath.Path.prototype.getPoint = function( t ) {

    var curveLengths = this.getCurveLengths();
    var d = t * curveLengths[curveLengths.length - 1];
    var i = 0, diff, curve;

    // To think about boundaries points.

    while ( i < curveLengths.length ) {

        if ( curveLengths[ i ] >= d ) {

            diff = curveLengths[ i ] - d;
            curve = this.curves[ i ];

            var u = 1 - diff / curve.getLength();

            return curve.getPointAt( u );

        }

        i ++;

    }

    return null;

    // loop where sum != 0, sum > d , sum+1 <d

};

$._ext_ILST.DividePath.Path.prototype.getPoints = function( ts ) {
    var cLens = this.getCurveLengths(), 
        cLen = cLens[cLens.length-1], temp_points,
        i, j, datas=[], result=[], uplen = 0;
    for(i=0; i<cLens.length; i++) {

        if(i===0) uplen = 0;
        else uplen = cLens[i-1];

        datas.push([this.curves[i], []]);
        for(j=0; j<ts.length; j++) {
            if(ts[j]*cLen <= cLens[i]  && ts[j]*cLen > uplen) {
               datas[i][1].push((cLen*ts[j]-uplen)/(cLens[i]-uplen));
            }
        }
    }

    for(i=0; i<datas.length; i++) {
        temp_points = datas[i][0].getPoints(datas[i][1]);
        result = result.concat(temp_points);
    }

    return  result;
};


$._ext_ILST.DividePath.Path.prototype.getLength = function() {

    var lens = this.getCurveLengths();
    return lens[ lens.length - 1 ];

};

$._ext_ILST.DividePath.Path.prototype.getCurveLengths = function() {

    // We use cache values if curves and cache array are same length

    if ( this.cacheLengths && this.cacheLengths.length == this.curves.length ) {

        return this.cacheLengths;

    };

    // Get length of subsurve
    // Push sums into cached array

    var lengths = [], sums = 0;
    var i, il = this.curves.length;

    for ( i = 0; i < il; i ++ ) {

        sums += this.curves[ i ].getLength();
        lengths.push( sums );

    }

    this.cacheLengths = lengths;

    return lengths;

};

$._ext_ILST.DividePath.Path.prototype.getIntersectionPoint = function(line) {
    var i, t, uplen, lens = this.getCurveLengths(), size = lens.length;
    for(i=0; i<size; i++) {
        t = this.curves[i].getIntersectionPoint(line);
        if(t) {
            if(i === 0) {
                uplen = 0;
            } else {
                uplen = lens[i-1];
            }

            return uplen/lens[size-1] + t * (lens[i]-uplen)/lens[size-1];
        }
    }

    return null;
};


// 
$._ext_ILST.DividePath.CircularArray = function(list) {
    this.list = list;
    this.current = 0;
};

$._ext_ILST.DividePath.CircularArray.prototype = {
    gotoBack : function() {
        if(this.current === 0) this.current = this.list.length-1;
        else this.current -= 1;

        return this.list[this.current];
    },

    gotoNext : function() {
        if(this.current === this.list.length-1) this.current = 0;
        else this.current += 1;

        return this.list[this.current];
    },

    getBack : function() {
        if(this.current === 0) {
            return this.list[this.list.length-1];
        } else {
            return this.list[this.current - 1]; 
        }
    },

    getNext : function() {
        if(this.current === this.list.length-1) {
            return this.list[0];
        } else {
            return this.list[this.current + 1];
        }
    },

    getCurrentValue : function() {
        return this.list[this.current];
    }
};

// 判断两物体是否相等
$._ext_ILST.DividePath.isEqual = function(obj1, obj2, distance) {
    var dis = distance || 0.00001;
    var ax = Math.abs(obj1.anchor[0] - obj2.anchor[0]),
        ay = Math.abs(obj1.anchor[1] - obj2.anchor[1]),

        lx = Math.abs(obj1.leftDirection[0] - obj2.leftDirection[0]),
        ly = Math.abs(obj1.leftDirection[1] - obj2.leftDirection[1]), 

        rx = Math.abs(obj1.rightDirection[0] - obj2.rightDirection[0]),
        ry = Math.abs(obj1.rightDirection[1] - obj2.rightDirection[1]);

    if(ax<=dis && ay<=dis && lx<=dis && ly<=dis && rx<=dis && ry<=dis) {
        return true;
    } else {
        return false;
    }
};

$._ext_ILST.DividePath.findElement = function(list, element) {
    for(var i=0; i<list.length; i++) {
        if($._ext_ILST.DividePath.isEqual(element, list[i])) {
            return i;
        }
    }

    return -1;
};

// 根据路径生成相应数量的圆
$._ext_ILST.DividePath.generateRounds = function(path, parent, number, radius, rnumber) {
    var step_t = 1.0 / number, start_t = 1.0 / (2 * number), t, round_center, path_item;
    var _subParent, i=1;
    for(t = start_t; t < 1.0; t += step_t) {
        round_center = path.getPoint(t);
        if(round_center) {
            if(parent.typename === "GroupItem") {
                _subParent = parent.groupItems.add();
            } else if(parent.typename === "Layer") {
                _subParent = parent.layers.add();

            }
            _subParent.name = parent.name + " R " + rnumber + " S " + (i++).toString();
            path_item = _subParent.pathItems.ellipse(round_center.y + radius, round_center.x - radius, 2*radius, 2*radius);
            //path_item = parent.pathItems.add();
            //path_item.setEntirePath([[round_center.x, round_center.y]]);
            path_item.stroket = true;
            path_item.filled = false;
        }
    }
};

//根据路径生成相应路径
$._ext_ILST.DividePath.generatePathLine = function(path, parent, rnumber) {
	var _subParent, _subPath, _tempPathPoint, i, _eachAction;
	for(i=0; i<path.actions.length; i++) {
		_eachAction = path.actions[i];
		if(_eachAction["action"] == $._ext_ILST.DividePath.PathActions.MOVE_TO) {
			if(parent.typename === "GroupItem") {
                _subParent = parent.groupItems.add();
            } else if(parent.typename === "Layer") {
                _subParent = parent.layers.add();
            }
			_subParent.name = parent.name + " R " + rnumber;
			
			_subPath = _subParent.pathItems.add();
			
			_tempPathPoint = _subPath.pathPoints.add();
			_tempPathPoint.anchor = _eachAction["args"];
            _tempPathPoint.leftDirection = _eachAction["args"];
//            _tempPathPoint.rightDirection = _eachAction["args"];
            
			_subPath.stroket = true;
			_subPath.filled = false;
		} else if(_eachAction["action"] == $._ext_ILST.DividePath.PathActions.LINE_TO) {
			_tempPathPoint.rightDirection = _tempPathPoint.anchor;
			_tempPathPoint = _subPath.pathPoints.add();
			_tempPathPoint.anchor = _eachAction["args"];
            _tempPathPoint.leftDirection = _eachAction["args"];
            _tempPathPoint.rightDirection = _eachAction["args"];
            
		} else if(_eachAction["action"] == $._ext_ILST.DividePath.PathActions.BEZIER_CURVE_TO) {
			_tempPathPoint.rightDirection = [_eachAction["args"][0], _eachAction["args"][1]];
			_tempPathPoint = _subPath.pathPoints.add();
			_tempPathPoint.anchor = [_eachAction["args"][4], _eachAction["args"][5]];
            _tempPathPoint.leftDirection = [_eachAction["args"][2], _eachAction["args"][3]];
            _tempPathPoint.rightDirection = _tempPathPoint.anchor;
		}
	}

};

// 执行分割
$._ext_ILST.DividePath.execute = function(divide, roundList, radius, isPath) { // roundList = [10, 10, 9, ...], radius = 8
    if(divide === undefined) divide = 3;
    if(roundList === undefined) roundList = [8, 8, 6];
    if(radius === undefined) radius = 2;
    if(radius === undefined) isPath = false;
    var isDrawRounds = true;
    if(!roundList) {
        isDrawRounds = false;
    } else {
        if(roundList.length === 0 ) {
            isDrawRounds = false;
        }
    }

//     var i, j, allPoints = $._ext_ILST.DividePath.test();
//     var doc = app.documents[0]; 
//     var selection = doc.layers[0].pathItems;
    
    var doc = app.activeDocument; 
    var selection = doc.selection;
    if(selection.length === 0) {
        alert("没有路径被选择.");
        return;
    }
    var i, j, allPoints = [];
     
    for(i=0; i<selection[0].pathPoints.length; i++) {
       allPoints.push(selection[0].pathPoints[i]);
    }

    var cArray = new $._ext_ILST.DividePath.CircularArray(allPoints);


	// alert(this.startPoints.length);
    // 如果开始点的集合第一个点是曲线开始的点，并且最后的点事曲线最后的点，将开始集合中第一个点移动最后。
    if($._ext_ILST.DividePath.isEqual(this.startPoints[0], allPoints[0]) && $._ext_ILST.DividePath.isEqual(this.startPoints[this.startPoints.length-1], allPoints[allPoints.length-1])) {
        var _tdp = this.startPoints.shift();
        this.startPoints.push(_tdp);
    }
    var startList = this.startPoints;

    // 如果结束点的集合第一个点是曲线开始的点，并且最后的点事曲线最后的点，将开始集合中第一个点移动最后。
    if($._ext_ILST.DividePath.isEqual(this.endPoints[0], allPoints[0]) && $._ext_ILST.DividePath.isEqual(this.endPoints[this.endPoints.length-1], allPoints[allPoints.length-1])) {
        var _tdp = this.endPoints.shift();
        this.endPoints.push(_tdp);
    }
    var endList = this.endPoints.reverse(); // 翻转
    

    for(i=0; i<allPoints.length; i++){
        // alert("ap :" + allPoints[i].anchor[0] + " sl : "+startList[0].anchor[0]);
        if($._ext_ILST.DividePath.isEqual(allPoints[i], startList[0])) {
            cArray.current = i;
            break;
        }
    }

    var oneList = [], anotherList = [];

    var c = false;

    if($._ext_ILST.DividePath.isEqual(cArray.getNext(), startList[1])) {
        //alert("ggggg");
        oneList.push(cArray.getCurrentValue());
        var goto_back;
        while(true) {
            goto_back = cArray.gotoBack(); 
            if($._ext_ILST.DividePath.isEqual(goto_back, startList[startList.length-1])) {
                anotherList.splice(0, 0, goto_back);
                break;
            } else {
                if($._ext_ILST.DividePath.findElement(endList, goto_back) === -1) {
                    if(!c) {
                       oneList.push(goto_back);
                   } else {
                       anotherList.splice(0, 0, goto_back);
                    }
                } else {
                    if(!c) c = true;
                    if($._ext_ILST.DividePath.isEqual(goto_back, endList[0])) {
                        oneList.push(goto_back);
                    } else if($._ext_ILST.DividePath.isEqual(goto_back, endList[endList.length-1])) {
                        anotherList.splice(0, 0, goto_back);
                    }
                }
            }
        }
    } else if($._ext_ILST.DividePath.isEqual(cArray.getBack(), startList[1])) {
        //alert("hhhh");
        oneList.push(cArray.getCurrentValue());
        var goto_next;
        while(true) {
            goto_next = cArray.gotoNext();
            if($._ext_ILST.DividePath.isEqual(goto_next, startList[startList.length-1])) {
                anotherList.splice(0, 0, goto_next);
                break;
            } else {
                if($._ext_ILST.DividePath.findElement(endList, goto_next) === -1) {
                    if(!c) {
                        oneList.push(goto_next);
                    } else {
                        anotherList.splice(0, 0, goto_next);
                    }
                } else {
                    if(!c) c = true;
                    if($._ext_ILST.DividePath.isEqual(goto_next, endList[0])) {
                        oneList.push(goto_next);
                    } else if($._ext_ILST.DividePath.isEqual(goto_next, endList[endList.length-1])) {
                        anotherList.splice(0, 0, goto_next);
                    }
                }
            }
        }
    }

    //anotherList[1].leftDirection = [0, 0];
    //alert(oneList);
    // alert(anotherList.length);
    var _t, _divide,
        _tempLine1 = new $._ext_ILST.DividePath.Line(),
        _tempLine2 = _tempLine1.clone(), 
        _tempLine3  = _tempLine1.clone(),
        _tempAnchor, _tempLeft, _tempRight,
        _Lsx, _Lsy, _Rsx, _Rsy, _Lex, _Ley, _Rex, _Rey, _Lcx, _Lcy, _Rcx, _Rcy,
        _list = [];// 中间环节点, 根据开始和结束点分割出来的点列表. _list = [[...], [...], ...]

    for(i=0; i<startList.length; i++) {
        _list.push([]);
        _Lsx = startList[i].leftDirection[0] - startList[i].anchor[0];
        _Lsy = startList[i].leftDirection[1] - startList[i].anchor[1];
        _Rsx = startList[i].rightDirection[0] - startList[i].anchor[0];
        _Rsy = startList[i].rightDirection[1] - startList[i].anchor[1];
        _Lex = endList[i].leftDirection[0] - endList[i].anchor[0];
        _Ley = endList[i].leftDirection[1] - endList[i].anchor[1];
        _Rex = endList[i].rightDirection[0] - endList[i].anchor[0];
        _Rey = endList[i].rightDirection[1] - endList[i].anchor[1];
        
        _Lcx = _Rex - _Lsx;
        _Lcy = _Rey - _Lsy;

        _Rcx = _Lex - _Rsx;
        _Rcy = _Ley - _Rsy;

        _tempLine1.point1.set(startList[i].leftDirection[0],  startList[i].leftDirection[1]);
        _tempLine1.point2.set(endList[i].rightDirection[0],  endList[i].rightDirection[1]);
        _tempLine2.point1.set(startList[i].anchor[0],  startList[i].anchor[1]);
        _tempLine2.point2.set(endList[i].anchor[0],  endList[i].anchor[1]);
        _tempLine3.point1.set(startList[i].rightDirection[0],  startList[i].rightDirection[1]);
        _tempLine3.point2.set(endList[i].leftDirection[0],  endList[i].leftDirection[1]);
        
        _divide = divide
        if(isDrawRounds || !isPath) _divide -= 1;
        for(j=0; j<=_divide; j++) {
            _t = j/divide;
            if(isDrawRounds || !isPath) _t += 1 / (2 * divide);
            //_list[i].push([_tempLine1.getPoint(_t), _tempLine2.getPoint(_t), _tempLine3.getPoint(_t)]);
            _tempAnchor = _tempLine2.getPoint(_t);
            _tempLeft = _tempAnchor.clone();
            _tempRight = _tempAnchor.clone();
            _tempLeft.x = _Lsx+_Lcx*_t;
            _tempLeft.y = _Lsy+_Lcy*_t;


            _tempRight.x = _Rsx+_Rcx*_t;
            _tempRight.y = _Rsy+_Rcy*_t;

            _list[i].push([_tempLeft, _tempAnchor, _tempRight]);
        }

    }

    // 得到一边点和另一边点的集合
    var _tempOneList = [], _tempAnotherList = [],
        onePath = new $._ext_ILST.DividePath.Path(),
        anotherPath = new $._ext_ILST.DividePath.Path();

    // one 
    onePath.moveTo(oneList[0].anchor[0], oneList[0].anchor[1]);
    for(i=0; i<oneList.length-1; i++) {
        if(oneList[i].leftDirection[0] === oneList[i].anchor[0] 
            && oneList[i].leftDirection[1] === oneList[i].anchor[1]
            && oneList[i+1].rightDirection[0] === oneList[i+1].anchor[0]
            && oneList[i+1].rightDirection[1] === oneList[i+1].anchor[1]) {

            onePath.lineTo(oneList[i+1].anchor[0], oneList[i+1].anchor[1]);

        } else {
            onePath.bezierCurveTo(oneList[i].leftDirection[0], oneList[i].leftDirection[1], 
                                oneList[i+1].rightDirection[0], oneList[i+1].rightDirection[1],
                                oneList[i+1].anchor[0], oneList[i+1].anchor[1]);
        }
        
    }

    // another 
    anotherPath.moveTo(anotherList[0].anchor[0], anotherList[0].anchor[1]);
    for(i=0; i<anotherList.length-1; i++) {
        if(anotherList[i].rightDirection[0] === anotherList[i].anchor[0] 
            && anotherList[i].rightDirection[1] === anotherList[i].anchor[1]
            && anotherList[i+1].leftDirection[0] === anotherList[i+1].anchor[0]
            && anotherList[i+1].leftDirection[1] === anotherList[i+1].anchor[1]) {

            anotherPath.lineTo(anotherList[i+1].anchor[0], anotherList[i+1].anchor[1]);

        } else {
            anotherPath.bezierCurveTo(anotherList[i].rightDirection[0], anotherList[i].rightDirection[1], 
                                anotherList[i+1].leftDirection[0], anotherList[i+1].leftDirection[1],
                                anotherList[i+1].anchor[0], anotherList[i+1].anchor[1]);
        }
        
    }
    
    // Get t array
    var _zline = new $._ext_ILST.DividePath.Line(), _onezts = [], _anotherzts = [], _zListLen = _list.length, _zListLen0 = _list[0].length, tempi;
    var __zListLen0 = _zListLen0;
    if(isDrawRounds || !isPath) __zListLen0 += 2;

    for(i=1; i<__zListLen0-1; i++) {
        if(isDrawRounds || !isPath) tempi = i - 1;
        else tempi = i;
        // if(_list[0][tempi][2].x == 0 && _list[0][tempi][2].y == 0) {
        //     _zline.set(_list[0][tempi][1], _list[1][tempi][1]);
        // } else {
        _zline.set(_list[0][tempi][1], _list[1][tempi][1]);
        // }
        
        _onezts.push(onePath.getIntersectionPoint(_zline));

        // if(_list[_zListLen-1][tempi][1].x == _list[_zListLen-1][tempi][2].x && _list[_zListLen-1][tempi][1].y == _list[_zListLen-1][tempi][2].y) {
        //     _zline.set(_list[_zListLen-1][tempi][1], _list[_zListLen-2][tempi][1]);
        // } else {
        _zline.set(_list[_zListLen-1][tempi][1], _list[_zListLen-2][tempi][1]);
        // }  

        _anotherzts.push(anotherPath.getIntersectionPoint(_zline));
    }


    _onezts.sort(function(a,b){return a>b?1:-1});//从小到大排序
    _anotherzts.sort(function(a,b){return a>b?1:-1});//从小到大排序

    // alert(_onezts);
    // alert(_anotherzts);



    // for(i=0; i<_zOnePs.length; i++) {
    //     alert(_zOnePs[i][0]);
    // }
    var _parent = selection[0].parent;
    if(isDrawRounds || !isPath) {
        if(_onezts.length !== _anotherzts.length || _onezts.length !== _list[0].length) {
            alert("Error: ");
            return;
        } else {
        	if (isDrawRounds && _onezts.length !== roundList.length) {
                alert("Error: ");
                return;
            }
            var _tpath, _t0, _tx1, _ty1, _tx2, _ty2, _t3, _tx3, _ty3, zuihouargs;
            for(i=0; i<_onezts.length; i++) {
                _tpath = new $._ext_ILST.DividePath.Path();
                _t0 = onePath.getPoint(_onezts[i]);
                _tpath.moveTo(_t0.x, _t0.y);
                for(j=0; j<_zListLen-1; j++) {
                    zuihouargs = _tpath.actions[_tpath.actions.length-1].args;
                    _tx1 =  zuihouargs[zuihouargs.length-2] +_list[j][i][2].x;
                    _ty1 = zuihouargs[zuihouargs.length-1] + _list[j][i][2].y;


                    if(j === _zListLen -2) {
                        _t3 = anotherPath.getPoint(_anotherzts[i]);
                        _tx3 = _t3.x;
                        _ty3 = _t3.y;
                    } else {
                        _tx3 = _list[j+1][i][1].x;
                        _ty3 = _list[j+1][i][1].y;
                    }

                    _tx2 = _tx3 + _list[j+1][i][0].x;
                    _ty2 = _ty3 + _list[j+1][i][0].y;

                    _tpath.bezierCurveTo(_tx1, _ty1, _tx2, _ty2, _tx3, _ty3);
                }
                // var ttt = _parent.pathItems.add();
                // var aa1 = ttt.pathPoints.add();
                // var aa2 = ttt.pathPoints.add();
                // aa1.anchor = [_t0.x, _t0.y];
                // aa1.rightDirection = [_tx1, _ty1];
                // aa1.leftDirection = aa1.anchor;
                // aa2.anchor = [_tx3, _ty3];
                // aa2.rightDirection = aa2.anchor;
                // aa2.leftDirection = [_tx2, _ty2];

                if(isDrawRounds) $._ext_ILST.DividePath.generateRounds(_tpath, _parent, roundList[i], radius, i+1);
                if(!isPath) $._ext_ILST.DividePath.generatePathLine(_tpath, _parent, i+1);
            }
        }
    } else {
        var _zOnePs = onePath.getPoints(_onezts);
        var _zAnthorPs = anotherPath.getPoints(_anotherzts);

        function _getPL(_ps) {
            var _offset = 0, _tempPL=[], _PL = [];
            while(_offset < _ps.length) {
                if(_ps[_offset][3]) {
                    _tempPL.push(_ps[_offset]);
                    _PL.push(_tempPL);
                    _tempPL = [];
                    _tempPL.push(_ps[_offset]);
                } else {
                   _tempPL.push(_ps[_offset]);
                   if(_offset === _ps.length-1) {
                        _PL.push(_tempPL);

                   }
                }

                _offset++;
            }

            return _PL;
        }

        var _OPL = _getPL(_zOnePs), _APL = _getPL(_zAnthorPs);

        if(_OPL.length !== _APL.length || _OPL.length !== _list[0].length-1) {
            alert("Error: ");
            return;
        } else {
            var _subParent, _tempPath, _tempPathPoint;
            for(i=0; i<_OPL.length; i++) {
                if(_parent.typename === "GroupItem") {
                    _subParent = _parent.groupItems.add();
                } else if(_parent.typename === "Layer") {
                    _subParent = _parent.layers.add();
                }
                _subParent.name = _parent.name + " R " + (i+1).toString();

                _tempPath = _subParent.pathItems.add();

                // top
                for(j=1; j<_list.length-1; j++) {
                    _tempPathPoint = _tempPath.pathPoints.add();
                    _tempPathPoint.anchor = [_list[j][i][1].x, _list[j][i][1].y];
                    _tempPathPoint.leftDirection = [_list[j][i][1].x+_list[j][i][0].x, _list[j][i][1].y+_list[j][i][0].y];
                    _tempPathPoint.rightDirection = [_list[j][i][1].x+_list[j][i][2].x, _list[j][i][1].y+_list[j][i][2].y];
                }

                // another
                for(j=0; j<_APL[i].length; j++) {
                    _tempPathPoint = _tempPath.pathPoints.add();
                    _tempPathPoint.anchor = [_APL[i][j][1].x, _APL[i][j][1].y];
                    if(j === 0) {
                       _tempPathPoint.leftDirection = [_tempPathPoint.anchor[0]+_list[_list.length-1][i][0].x, _tempPathPoint.anchor[1]+_list[_list.length-1][i][0].y];
                       if(_APL[i][j][2])
                            _tempPathPoint.rightDirection = [_APL[i][j][2].x, _APL[i][j][2].y];
                        else
                            _tempPathPoint.rightDirection = _tempPathPoint.anchor;
                    } else if (j === _APL[i].length-1) {
                        _tempPathPoint.rightDirection = [_tempPathPoint.anchor[0]+_list[_list.length-1][i+1][0].x, _tempPathPoint.anchor[1]+_list[_list.length-1][i+1][0].y];
                        if(_APL[i][j][0])
                            _tempPathPoint.leftDirection = [_APL[i][j][0].x, _APL[i][j][0].y];
                        else
                            _tempPathPoint.leftDirection = _tempPathPoint.anchor;  
                    } else {
                        if(_APL[i][j][0])
                            _tempPathPoint.leftDirection = [_APL[i][j][0].x, _APL[i][j][0].y];
                        else
                            _tempPathPoint.leftDirection = _tempPathPoint.anchor;  

                        if(_APL[i][j][2])
                            _tempPathPoint.rightDirection = [_APL[i][j][2].x, _APL[i][j][2].y];
                        else
                            _tempPathPoint.rightDirection = _tempPathPoint.anchor;

                    }
                }
                // bottom
                for(j=_list.length-2; j>0; j--) {
                    _tempPathPoint = _tempPath.pathPoints.add();
                    _tempPathPoint.anchor = [_list[j][i+1][1].x, _list[j][i+1][1].y];
                    _tempPathPoint.leftDirection = [_list[j][i+1][1].x+_list[j][i+1][2].x, _list[j][i+1][1].y+_list[j][i+1][2].y];
                    _tempPathPoint.rightDirection = [_list[j][i+1][1].x+_list[j][i+1][0].x, _list[j][i+1][1].y+_list[j][i+1][0].y];
                }

                // one
                for(j=_OPL[i].length-1; j>=0; j--) {
                    _tempPathPoint = _tempPath.pathPoints.add();
                    _tempPathPoint.anchor = [_OPL[i][j][1].x, _OPL[i][j][1].y];
                    if(j === 0) {
                       _tempPathPoint.rightDirection = [_tempPathPoint.anchor[0]+_list[0][i][2].x, _tempPathPoint.anchor[1]+_list[0][i][2].y];
                       if(_OPL[i][j][2])
                            _tempPathPoint.leftDirection = [_OPL[i][j][2].x, _OPL[i][j][2].y];
                        else
                            _tempPathPoint.leftDirection = _tempPathPoint.anchor;
                    } else if (j === _OPL[i].length-1) {
                        _tempPathPoint.leftDirection = [_tempPathPoint.anchor[0]+_list[0][i+1][2].x, _tempPathPoint.anchor[1]+_list[0][i+1][2].y];
                        if(_OPL[i][j][0])
                            _tempPathPoint.rightDirection = [_OPL[i][j][0].x, _OPL[i][j][0].y];
                        else
                            _tempPathPoint.rightDirection = _tempPathPoint.anchor;  
                    } else {
                        if(_OPL[i][j][0])
                            _tempPathPoint.rightDirection = [_OPL[i][j][0].x, _OPL[i][j][0].y];
                        else
                            _tempPathPoint.rightDirection = _tempPathPoint.anchor; 

                        if(_OPL[i][j][2])
                            _tempPathPoint.leftDirection = [_OPL[i][j][2].x, _OPL[i][j][2].y];
                        else
                            _tempPathPoint.leftDirection = _tempPathPoint.anchor;

                    }
                }

                _tempPath.closed = true;
                _tempPath.stroket = true;
                _tempPath.filled = false;

            }
        }
    }
};

//$._ext_ILST.DividePath.execute(5, [], 0, false);
