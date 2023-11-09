
## Clozure Syntaxes

The following are different clozure syntaxes. This list was copied from https://github.com/Pseudonium/Obsidian_to_Anki/wiki/Cloze-formatting

### Curly Brace Style (OG)

1. This is a {cloze} note with {two clozes} -> This is a {{c1::cloze}} note with {{c2::two clozes}}
2. This is a {2:cloze} note with {1:id syntax} -> This is a {{c2::cloze}} note with {{c1::id syntax}}
3. This is a {2|cloze} {3|note} with {1|alternate id syntax} -> This is a {{c2::cloze}} {{c3::note}} with {{c1::alternate id syntax}}
4. This is a {c1:cloze} note with {c2:another} type of {c3:id syntax} -> This is a {{c1::cloze}} note with {{c2::another}} type of {{c3::id syntax}}
5. This is a {c1|cloze} note with {c2|yet another} type of {c3|id syntax} -> This is a {{c1::cloze}} note with {{c2::yet another}} type of {{c3::id syntax}}


### Highlight Style

1. This is a ==cloze== note with ==two clozes== -> This is a ==c1::cloze== note with ==c2::two clozes==
2. This is a ==2:cloze== note with ==1:id syntax== -> This is a ==c2::cloze== note with ==c1::id syntax==
3. This is a ==2|cloze== ==3|note== with ==1|alternate id syntax== -> This is a ==c2::cloze== ==c3::note== with ==c1::alternate id syntax==
4. This is a ==c1:cloze== note with ==c2:another== type of ==c3:id syntax== -> This is a ==c1::cloze== note with ==c2::another== type of ==c3::id syntax==
5. This is a ==c1|cloze== note with ==c2|yet another== type of ==c3|id syntax== -> This is a ==c1::cloze== note with ==c2::yet another== type of ==c3::id syntax==


## Mixing Styles

### Curly Brace Style

1. This is a {cloze} note with {multiple} non-id clozes, as well as {2:some clozes} with {c1|other styles}
2. This is a {{c1::cloze}} note with {{c2::multiple}} non-id clozes, as well as {{c2::some clozes}} with {{c1::other styles}}

### Highlight Style

1. This is a ==cloze== note with ==multiple== non-id clozes, as well as ==2:some clozes== with ==c1|other styles==
2. This is a ==c1::cloze== note with ==c2::multiple== non-id clozes, as well as ==c2::some clozes== with ==c1::other styles==


## Lets also test outside of a list

### Curly Brace Style (OG)

This is a {cloze} note with {two clozes} -> This is a {{c1::cloze}} note with {{c2::two clozes}}

This is a {2:cloze} note with {1:id syntax} -> This is a {{c2::cloze}} note with {{c1::id syntax}}

This is a {2|cloze} {3|note} with {1|alternate id syntax} -> This is a {{c2::cloze}} {{c3::note}} with {{c1::alternate id syntax}}

This is a {c1:cloze} note with {c2:another} type of {c3:id syntax} -> This is a {{c1::cloze}} note with {{c2::another}} type of {{c3::id syntax}}

This is a {c1|cloze} note with {c2|yet another} type of {c3|id syntax} -> This is a {{c1::cloze}} note with {{c2::yet another}} type of {{c3::id syntax}}


### Highlight Style

This is a ==cloze== note with ==two clozes== -> This is a ==c1::cloze== note with ==c2::two clozes==

This is a ==2:cloze== note with ==1:id syntax== -> This is a ==c2::cloze== note with ==c1::id syntax==

This is a ==2|cloze== ==3|note== with ==1|alternate id syntax== -> This is a ==c2::cloze== ==c3::note== with ==c1::alternate id syntax==

This is a ==c1:cloze== note with ==c2:another== type of ==c3:id syntax== -> This is a ==c1::cloze== note with ==c2::another== type of ==c3::id syntax==

This is a ==c1|cloze== note with ==c2|yet another== type of ==c3|id syntax== -> This is a ==c1::cloze== note with ==c2::yet another== type of ==c3::id syntax==


## Mixing Styles

### Curly Brace Style

This is a {cloze} note with {multiple} non-id clozes, as well as {2:some clozes} with {c1|other styles}

This is a {{c1::cloze}} note with {{c2::multiple}} non-id clozes, as well as {{c2::some clozes}} with {{c1::other styles}}

### Highlight Style

This is a ==cloze== note with ==multiple== non-id clozes, as well as ==2:some clozes== with ==c1|other styles==

This is a ==c1::cloze== note with ==c2::multiple== non-id clozes, as well as ==c2::some clozes== with ==c1::other styles==