# Switch to scripted CMS migrations

We decided to switch from manual content model changes to scripted migrations.

- Date: 2023-05-08
- Alternatives Considered: keep on doing manual content model changes
- Decision Made By: [Selwyn](https://github.com/siilwyn), [Frank](https://github.com/Frankwarnaar)

## Decision

We decided to switch to scripted migrations to make model changes more reliable, thus providing us more confidence doing large model changes. 
Since the Voorhoede site was set up 5 years ago, at the time of writing, the content modelling is also lacking behind our current standards.
Therefore, large content model changes are necessary for future development.
