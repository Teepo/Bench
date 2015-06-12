function sleep (ms){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + ms);
}

function extend()
{
    var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
        i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;
            target = arguments[ i ] || {};
            i++;
        }

        if (typeof target !== "object" && typeof target == "function")
            target = {};

        if (i === length) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            if ((options = arguments[i]) != null) {

                for (name in options) {

                    src = target[name];
                    copy = options[name];

                    if (target === copy)
                        continue;

                    if (deep && copy) {

                        if (copyIsArray)
                            copyIsArray = false;

                        clone = src ? src : {};

                        target[name] = extend(deep, clone, copy);
                    }
                    else if (typeof copy !== "undefined")
                        target[name] = copy;
                }
            }
        }

        return target;
}