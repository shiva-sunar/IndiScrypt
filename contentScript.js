window.onload = replacer;

function translateIndic(str) {
    var devanagari = /[\u0900-\u097F]/;
    splitted = str.split(" ")
    indic = ""
    for (let i = 0; i < splitted.length; i++) {
        if (devanagari.test(splitted[i])) {
            word = splitted[i]
            translated = Sanscript.t(word, 'devanagari', 'bengali')
            indic += translated + " " + word + " "
        } else {
            indic += splitted[i] + " "
        }
    }
    return indic
}

function replacer() {
    var elements = document.getElementsByTagName('p');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = translateIndic(text)
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

! function(global) {
    'use strict';
    var Sanscript = function() {};
    Sanscript.defaults = {
        skip_sgml: false,
        syncope: false,
        enableTamilPronounciation: true,
        enableTamilCharPositionFixes: true,
        enableSanskritVedicAccents: true,
    };
    /* Schemes
     * =======
     * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
     * describe abugida scripts found in India. "Roman" schemes describe
     * manufactured alphabets that are meant to describe or encode Brahmi
     * scripts. Abugidas and alphabets are processed by separate algorithms
     * because of the unique difficulties involved with each.
     *
     * Brahmic consonants are stated without a virama. Roman consonants are
     * stated without the vowel 'a'.
     *
     * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
     * and "roman" for clarity.)
     */
    var schemes = Sanscript.schemes = {
            /* Bengali
             * -------
             * 'va' and 'ba' are both rendered as ???.
             */
            bengali: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                other: '    ??? ???  ??? '.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Devanagari
             * ----------
             * The most comprehensive and unambiguous Brahmic script listed.
             */
            devanagari: {
                // "Independent" forms of the vowels. These are used whenever the
                // vowel does not immediately follow a consonant.
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                // "Dependent" forms of the vowels. These are used whenever the
                // vowel immediately follows a consonant. If a letter is not
                // listed in `vowels`, it should not be listed here.
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                // Miscellaneous marks, all of which are used in Sanskrit.
                other_marks: '??? ??? ???'.split(' '),
                // In syllabic scripts like Devanagari, consonants have an inherent
                // vowel that must be suppressed explicitly. We do so by putting a
                // virama after the consonant.
                virama: ['???'],
                // Various Sanskrit consonants and consonant clusters. Every token
                // here has an explicit vowel. Thus "???" is "ka" instead of "k".
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                // Numbers and punctuation
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                // Zero-width joiner. This is used to separate a consonant cluster
                // and avoid a complex ligature.
                zwj: ['\u200D'],
                // Dummy consonant. This is used in ITRANS to prevert certain types
                // of parser ambiguity. Thus "barau" -> ????????? but "bara_u" -> ?????????.
                skip: [''],
                // Vedic accent. Udatta and anudatta.
                accent: ['\u0951', '\u0952'],
                // Accent combined with anusvara and and visarga. For compatibility
                // with ITRANS, which allows the reverse of these four.
                combo_accent: '?????? ?????? ?????? ??????'.split(' '),
                candra: ['???'],
                // Non-Sanskrit consonants
                other: '?????? ?????? ?????? ?????? ?????? ?????? ?????? ?????? ???'.split(' ')
            },
            /* Gujarati
             * --------
             * Sanskrit-complete.
             */
            gujarati: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? . ..'.split(' '),
                candra: ['???'],
                skip: [''],
                accent: ["", ""],
                combo_accent: ["", "", "", ""],
                other: '??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' ')
            },
            /* Gurmukhi
             * --------
             * Missing R/RR/lR/lRR
             */
            gurmukhi: {
                vowels: '??? ??? ??? ??? ??? ???      ??? ???  ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ???      ??? ???  ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ?????? ?????? ??? ??? ?????? ???????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                other: ' ??? ??? ??? ???  ???  '.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Kannada
             * -------
             * Sanskrit-complete.
             */
            kannada: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ?????? ??? ??? ???'.split(' '),
                other: '      ???  ???'.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Malayalam
             * ---------
             * Sanskrit-complete.
             */
            malayalam: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ?????? ??? ??? ???'.split(' '),
                other: '        ???'.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Oriya
             * -----
             * Sanskrit-complete.
             */
            oriya: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ???  ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ?????? ??? ??? ???'.split(' '),
                other: '    ??? ???  ??? '.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Tamil
             * -----
             * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
             * The most incomplete of the Sanskrit schemes here.
             */
            tamil: {
                vowels: '??? ??? ??? ??? ??? ??? ???????? ???????? ???????? ???????? ??? ??? ??? ??? ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ???????? ???????? ???????? ???????? ??? ??? ??? ??? ??? ???'.split(' '),
                other_marks: '????????? : '.split(' '),
                virama: ['???'],
                consonants: '??? ????? ????? ?????? ??? ??? ????? ??? ??? ??? ??? ????? ????? ?????? ??? ??? ????? ????? ?????? ??? ??? ????? ????? ?????? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '0 1 2 3 4 5 6 7 8 9 ??? ??? ??? ???'.split(' '),
                other: '        ???'.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* Telugu
             * ------
             * Sanskrit-complete.
             */
            telugu: {
                vowels: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                vowel_marks: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???'.split(' '),
                other_marks: '??? ??? ???'.split(' '),
                virama: ['???'],
                consonants: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ????????? ?????????'.split(' '),
                symbols: '??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ?????? ??? ??? ???'.split(' '),
                other: '        ???'.split(' '),
                accent: ["", ""],
                combo_accent: ["", "", "", ""]
            },
            /* International Alphabet of Sanskrit Transliteration
             * --------------------------------------------------
             * The most "professional" Sanskrit romanization scheme.
             */
            iast: {
                vowels: 'a ?? i ?? u ?? ??? ??? ??? ???  e ai  o au'.split(' '),
                other_marks: ['???', '???', '~'],
                virama: [''],
                consonants: 'k kh g gh ??? c ch j jh ?? ??? ???h ??? ???h ??? t th d dh n p ph b bh m y r l v ?? ??? s h ??? k??? j??'.split(' '),
                symbols: "0 1 2 3 4 5 6 7 8 9 o??? ' ??? ???".split(' ')
            },
            /* ITRANS
             * ------
             * One of the first romanization schemes -- and one of the most
             * complicated. For alternate forms, see the "allAlternates" variable
             * below.
             *
             * '_' is a "null" letter, which allows adjacent vowels.
             */
            itrans: {
                vowels: 'a A i I u U RRi RRI LLi LLI  e ai  o au'.split(' '),
                other_marks: ['M', 'H', '.N'],
                virama: [''],
                consonants: 'k kh g gh ~N ch Ch j jh ~n T Th D Dh N t th d dh n p ph b bh m y r l v sh Sh s h L kSh j~n'.split(' '),
                symbols: '0 1 2 3 4 5 6 7 8 9 OM .a | ||'.split(' '),
                candra: ['.c'],
                zwj: ['{}'],
                skip: '_',
                accent: ["\\'", "\\_"],
                combo_accent: "\\'H \\_H \\'M \\_M".split(' '),
                other: 'q K G z .D .Dh f Y R'.split(' ')
            },
            /* Harvard-Kyoto
             * -------------
             * A simple 1:1 mapping.
             */
            hk: {
                vowels: 'a A i I u U R RR lR lRR  e ai  o au'.split(' '),
                other_marks: 'M H ~'.split(' '),
                virama: [''],
                consonants: 'k kh g gh G c ch j jh J T Th D Dh N t th d dh n p ph b bh m y r l v z S s h L kS jJ'.split(' '),
                symbols: "0 1 2 3 4 5 6 7 8 9 OM ' | ||".split(' ')
            },
            /* National Library at Kolkata
             * ---------------------------
             * Apart from using "??" and "??" instead of "e" and "o", this scheme is
             * identical to IAST. ???, ???, and ??? are not part of the scheme proper.
             *
             * This is defined further below.
             */
            /* Sanskrit Library Phonetic Basic
             * -------------------------------
             * With one ASCII letter per phoneme, this is the tersest transliteration
             * scheme in use today and is especially suited to computer processing.
             */
            slp1: {
                vowels: 'a A i I u U f F x X  e E  o O'.split(' '),
                other_marks: 'M H ~'.split(' '),
                virama: [''],
                consonants: 'k K g G N c C j J Y w W q Q R t T d D n p P b B m y r l v S z s h L kz jY'.split(' '),
                symbols: "0 1 2 3 4 5 6 7 8 9 oM ' . ..".split(' ')
            },
            /* Velthuis
             * --------
             * A case-insensitive Sanskrit encoding.
             */
            velthuis: {
                vowels: 'a aa i ii u uu .r .rr .li .ll  e ai  o au'.split(' '),
                other_marks: '.m .h '.split(' '),
                virama: [''],
                consonants: 'k kh g gh "n c ch j jh ~n .t .th .d .d .n t th d dh n p ph b bh m y r l v ~s .s s h L k.s j~n'.split(' '),
                symbols: "0 1 2 3 4 5 6 7 8 9 o.m ' | ||".split(' ')
            },
            /* WX
             * --
             * As terse as SLP1.
             */
            wx: {
                vowels: 'a A i I u U q Q L   e E  o O'.split(' '),
                other_marks: 'M H z'.split(' '),
                virama: [''],
                consonants: 'k K g G f c C j J F t T d D N w W x X n p P b B m y r l v S R s h  kR jF'.split(' '),
                symbols: "0 1 2 3 4 5 6 7 8 9 oM ' | ||".split(' ')
            }
        },
        // Set of names of schemes
        romanSchemes = {},
        // Map of alternate encodings.
        allAlternates = {
            itrans: {
                A: ['aa'],
                I: ['ii', 'ee'],
                U: ['uu', 'oo'],
                RRi: ['R^i'],
                RRI: ['R^I'],
                LLi: ['L^i'],
                LLI: ['L^I'],
                M: ['.m', '.n'],
                '~N': ['N^'],
                ch: ['c'],
                Ch: ['C', 'chh'],
                '~n': ['JN'],
                v: ['w'],
                Sh: ['S', 'shh'],
                kSh: ['kS', 'x'],
                'j~n': ['GY', 'dny'],
                OM: ['AUM'],
                "\\_": ["\\`"],
                "\\_H": ["\\`H"],
                "\\'M": ["\\'.m", "\\'.n"],
                "\\_M": "\\_.m \\_.n \\`M \\`.m \\`.n".split(' '),
                ".a": ['~'],
                '|': ['.'],
                '||': ['..'],
                z: ['J']
            }
        },
        // object cache
        cache = {};
    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function(name) {
        return romanSchemes.hasOwnProperty(name);
    };
    /**
     * Add a Brahmic scheme to Sanscript.
     *
     * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
     * have an inherent vowel sound, but roman consonants do not. This is the
     * main difference between these two types of scheme.
     *
     * A scheme definition is an object ("{}") that maps a group name to a
     * list of characters. For illustration, see the "devanagari" scheme at
     * the top of this file.
     *
     * You can use whatever group names you like, but for the best results,
     * you should use the same group names that Sanscript does.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself. This should be constructed as
     *                described above.
     */
    Sanscript.addBrahmicScheme = function(name, scheme) {
        Sanscript.schemes[name] = scheme;
    };
    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    Sanscript.addRomanScheme = function(name, scheme) {
        if (!('vowel_marks' in scheme)) {
            scheme.vowel_marks = scheme.vowels.slice(1);
        }
        Sanscript.schemes[name] = scheme;
        romanSchemes[name] = true;
    };
    /**
     * Create a deep copy of an object, for certain kinds of objects.
     *
     * @param scheme  the scheme to copy
     * @return        the copy
     */
    var cheapCopy = function(scheme) {
        var copy = {};
        for (var key in scheme) {
            if (!scheme.hasOwnProperty(key)) {
                continue;
            }
            copy[key] = scheme[key].slice(0);
        }
        return copy;
    };
    // Set up various schemes
    (function() {
        // Set up roman schemes
        var kolkata = schemes.kolkata = cheapCopy(schemes.iast),
            schemeNames = 'iast itrans hk kolkata slp1 velthuis wx'.split(' ');
        kolkata.vowels = 'a ?? i ?? u ?? ??? ??? ??? ??? e ?? ai o ?? au'.split(' ');
        // These schemes already belong to Sanscript.schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        for (var i = 0, name;
            (name = schemeNames[i]); i++) {
            Sanscript.addRomanScheme(name, schemes[name]);
        }
        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        var itrans_dravidian = cheapCopy(schemes.itrans);
        itrans_dravidian.vowels = 'a A i I u U Ri RRI LLi LLi e E ai o O au'.split(' ');
        itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
        allAlternates.itrans_dravidian = allAlternates.itrans;
        Sanscript.addRomanScheme('itrans_dravidian', itrans_dravidian);
    }());
    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var alternates = allAlternates[from] || {},
            consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            tokenLengths = [],
            marks = {},
            toScheme = Sanscript.schemes[to];
        for (var group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (var i = 0; i < fromGroup.length; i++) {
                var F = fromGroup[i],
                    T = toGroup[i],
                    alts = alternates[F] || [],
                    numAlts = alts.length,
                    j = 0;
                tokenLengths.push(F.length);
                for (j = 0; j < numAlts; j++) {
                    tokenLengths.push(alts[j].length);
                }
                if (group === 'vowel_marks' || group === 'virama') {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === 'consonants' || group === 'other') {
                        consonants[F] = T;
                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }
        return {
            consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            maxTokenLength: Math.max.apply(Math, tokenLengths),
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama
        };
    };
    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateRoman = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            dataLength = data.length,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            maxTokenLength = map.maxTokenLength,
            optSkipSGML = options.skip_sgml,
            optSyncope = options.syncope,
            tempLetter,
            tempMark,
            tokenBuffer = '',
            toRoman = map.toRoman,
            virama = map.virama;
        // Transliteration state. It's controlled by these values:
        // - `skippingSGML`: are we in SGML?
        // - `toggledTrans`: are we in a toggled region?
        //
        // We combine these values into a single variable `skippingTrans`:
        //
        //     `skippingTrans` = skippingSGML || toggledTrans;
        //
        // If (and only if) this value is true, don't transliterate.
        var skippingSGML = false,
            skippingTrans = false,
            toggledTrans = false;
        for (var i = 0, L;
            (L = data.charAt(i)) || tokenBuffer; i++) {
            // Fill the token buffer, if possible.
            var difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }
            // Match all token substrings to our map.
            for (var j = 0; j < maxTokenLength; j++) {
                var token = tokenBuffer.substr(0, maxTokenLength - j);
                if (skippingSGML === true) {
                    skippingSGML = (token !== '>');
                } else if (token === '<') {
                    skippingSGML = optSkipSGML;
                } else if (token === '##') {
                    toggledTrans = !toggledTrans;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                skippingTrans = skippingSGML || toggledTrans;
                if ((tempLetter = letters[token]) !== undefined && !skippingTrans) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== 'a') {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength - j);
                    break;
                } else if (j === maxTokenLength - 1) {
                    if (hadConsonant) {
                        hadConsonant = false;
                        if (!optSyncope) {
                            buf.push(virama);
                        }
                    }
                    buf.push(token);
                    tokenBuffer = tokenBuffer.substr(1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && !optSyncope) {
            buf.push(virama);
        }
        return buf.join('');
    };
    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateBrahmic = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            danglingHash = false,
            hadRomanConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman,
            skippingTrans = false;
        for (var i = 0, L;
            (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === '#') {
                if (danglingHash) {
                    skippingTrans = !skippingTrans;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (skippingTrans) {
                buf.push(L);
                continue;
            }
            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push('#');
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters[L])) {
                    buf.push(temp);
                    hadRomanConsonant = toRoman && (L in consonants);
                } else {
                    buf.push(L);
                }
            }
        }
        if (hadRomanConsonant) {
            buf.push('a');
        }
        return buf.join('');
    };
    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    Sanscript.t = function(data, from, to, options) {
        options = options || {};
        var cachedOptions = cache.options || {},
            defaults = Sanscript.defaults,
            hasPriorState = (cache.from === from && cache.to === to),
            map;
        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                var value = defaults[key];
                if (key in options) {
                    value = options[key];
                }
                options[key] = value;
                // This comparison method is not generalizable, but since these
                // objects are associative arrays with identical keys and with
                // values of known type, it works fine here.
                if (value !== cachedOptions[key]) {
                    hasPriorState = false;
                }
            }
        }
        if (hasPriorState) {
            map = cache.map;
        } else {
            map = makeMap(from, to, options);
            cache = {
                from: from,
                map: map,
                options: options,
                to: to
            };
        }
        // Easy way out for "{\m+}", "\", and ".h".
        if (from === 'itrans') {
            data = data.replace(/\{\\m\+\}/g, ".h.N");
            data = data.replace(/\.h/g, '');
            data = data.replace(/\\([^'`_]|$)/g, "##$1##");
        }
        var alldata = '';
        if (map.fromRoman) {
            alldata = transliterateRoman(data, map, options);
        } else {
            alldata = transliterateBrahmic(data, map, options);
        }
        // Fix any remaining quotations for Vedic Accents
        if (to === 'devanagari' && options.enableSanskritVedicAccents === true) {
            //alldata = alldata.replace('\\"', "\u1CDA").replace('"', "\u1CDA").replace('&quot;', "\u1CDA");
            alldata = alldata.replace(/\\?"/g, "\u1CDA");
        } else if (!(to === "itrans" || to == "iast")) {
            alldata = alldata.replace(/\\?"/g, "");
        }
        // Enable Tamil Accents Support
        if (to == 'tamil' && options.enableTamilPronounciation == true) {
            alldata = alldata.replace(/(.)(??|??|???)(???|???|???|???|???|???|???|???|???|???|???|???)/g, "$1$3$2")
        }
        if (to == 'tamil' && options.enableTamilCharPositionFixes == true) {
            alldata = alldata.replace(/(^|\s+)(???|??????|??????)/g, "$1???$2").replace(/([^\s])???/g, "$1???")
        }
        return alldata;
    };
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Sanscript;
        });
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Sanscript;
        }
        exports.Sanscript = Sanscript;
    } else {
        global.Sanscript = Sanscript;
    }
}(this);
