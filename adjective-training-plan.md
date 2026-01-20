# Adjective Endings Training Plan

1. Review current training UI/state flow to mirror for new training type; identify reusable components and required new fields (gender step, nominative case, endings options).
2. Design data model + storage keys for adjective training items (template, gaps, expected ending, determiner type) and extend normalization/validation accordingly.
3. Update UI: add new training list item + detail header bindings, add gender-selection card, add case options (include nominative), add ending options card; reuse existing styles/classes.
4. Implement logic: training registry/active training selection, gender → case → ending progression, scoring/summary, explanation prompt for adjective endings.
5. Update i18n EN/RU, ensure session size controls work per training, and verify flow in browser (incl. iPhone 14 Pro Max viewport).
