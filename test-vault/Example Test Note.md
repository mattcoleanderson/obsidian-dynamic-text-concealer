
## Clozure Syntaxes

The following is a test based on the default regex for concealing. This regex is meant to conceal anki clozure syntax introduced by Obsidian_to_Anki.

https://github.com/Pseudonium/Obsidian_to_Anki/wiki/Cloze-formatting

## Paragraph Style Tests

Test a single {cloze}  note. 

Test {2} cloze {notes}.

Test a {{single}} double cloze note.

Test {{2}} double {{cloze}} notes.

{Test} a single cloze note at the beginning and a double cloze note at the {{end}}.

{{Test}} a double cloze note at the beginning and a single cloze note at the {end}.

Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.

Test multiple digit {{c11223:cloze notes}}.

Test that {**bold**}, {*italics*}, and {==highlights==} aren't removed.

Test that [[links]] aren't {[[removed]]}.

## List Style

1. Test a single {cloze} note.
2. Test  {2} cloze {notes}.
3. Test a {{single}} double cloze note.
4. Test {{2}} double {{cloze}} notes.
5. {Test} a single cloze note at the beginning and a double cloze note at the {{end}}.
6. {{Test}} a double cloze note at the beginning and a single cloze note at the {end}.
7. Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.
8. Test multiple digit {{c11223:cloze notes}}.
9. Test that {**bold**}, {*italics*}, and {==highlights==} aren't removed.
10. Test that [[links]] aren't {[[removed]]}.

- Test a single {cloze} note.
- Test  {2} cloze {notes}.
- Test a {{single}} double cloze note.
- Test {{2}} double {{cloze}} notes.ewsingle cloze note at the end.
- Test `c` note identifiers for {c1:single} and {{c2:double}} brackets along with {{c3::double colon}} and single {c3|pipe} syntaxes.
- Test multiple digit {{c11223:cloze notes}}.
- Test that {**bold**}, {*italics*}, and {==highlights==} aren't removed.
- Test that [[links]] aren't {[[removed]]}.

## Test Code Block

```typescript
export function foo(bar: Bar) {
	print('This {code} block should still have curly brackets)
}
```

