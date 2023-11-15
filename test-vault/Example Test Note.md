
## Clozure Syntaxes

The following are different clozure syntaxes. This list was copied from https://github.com/Pseudonium/Obsidian_to_Anki/wiki/Cloze-formatting


## Paragraph Style Tests

Test a single {cloze} note.

Test  {2} cloze {notes}.

Test a {{single}} double cloze note.

Test {{2}} double {{cloze}} notes.

{Test} a single cloze note at the beginning and a double cloze note at the {{end}}.

{{Test}} a double cloze note at the beginning and a single cloze note at the {end}.

Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.

Test multiple digit {{c11223:cloze notes}}.

Test that **bold**, *italics*, and ==highlights== aren't {{c1:removed}}.

Test that [[links]] aren't {removed}.

## List Style

1. Test a single {cloze} note.
2. Test  {2} cloze {notes}.
3. Test a {{single}} double cloze note.
4. Test {{2}} double {{cloze}} notes.
5. {Test} a single cloze note at the beginning and a double cloze note at the {{end}}.
6. {{Test}} a double cloze note at the beginning and a single cloze note at the {end}.
7. Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.
8. Test multiple digit {{c11223:cloze notes}}.
9. Test that **bold**, *italics*, and ==highlights== aren't {{c1:removed}}.
10. Test that [[links]] aren't {removed}.

- Test a single {cloze} note.
- Test  {2} cloze {notes}.
- Test a {{single}} double cloze note.
- Test {{2}} double {{cloze}} notes.
- {Test} a single cloze note at the beginning and a double cloze note at the {{end}}.
- {{Test}} a double cloze note at the beginning and a single cloze note at the {end}.
- Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.
- Test multiple digit {{c11223:cloze notes}}.
- Test that **bold**, *italics*, and ==highlights== aren't {{c1:removed}}.
- Test that [[links]] aren't {removed}.

## Test Code Block

```typescript
export function foo(bar: Bar) {
	print('This {code} block should still have curly brackets)
}
```


### Curly Brace Style (OG)

1. This is a {cloze} note with {two clozes} -> This is a {{c1::cloze}} note with {{c2::two clozes}}
2. This is a {2:cloze} note with {1:id syntax} -> This is a {{c2::cloze}} note with {{c1::id syntax}}
3. This is a {2|cloze} {3|note} **with** {1|alternate id syntax} -> This is a {{c2::cloze}} {{c3::note}} with {{c1::alternate id syntax}}
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