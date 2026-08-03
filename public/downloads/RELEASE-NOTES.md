# Vuttara 3.2.34

Released: 2026-08-03

## Keyboard, mouse and gesture controls

- Added a configurable registry containing 82 browser commands.
- Added middle-click link opening, tab closing, bookmark handling and automatic scrolling.
- Added mouse side-button navigation, wheel actions, rocker gestures, mouse gestures and super drag.
- Added a command palette, link hints, shortcut conflict detection, import/export and per-site exclusions.
- Added address-bar search aliases and additional page, media, tab and Vuttara-specific commands.

## Sign-in compatibility

- Added provider-agnostic OAuth 2.0, OpenID Connect and SAML popup and redirect handling.
- Added compatibility coverage for Google, Facebook, Apple, Microsoft, GitHub, Discord, Twitch, Amazon, Steam and other providers.
- Added FedCM, WebAuthn/passkey, Storage Access and confirmed external-application handoff controls.
- Preserved private-profile isolation, popup protections and explicit permission handling.

## Settings and tab improvements

- Added the Keyboard, Mouse & Sign-In settings editor with configurable keyboard, mouse, gesture and provider controls.
- Fixed the settings editor navigation, checkboxes, command list, Save, Restore defaults, Export and Import actions.
- Replaced temporary tab-audio letters with consistent speaker and muted-speaker icons.
- Fixed the Never Sleep sites field so it accepts line breaks, commas, semicolons and mixed separators while editing.

## Release validation

- Built from the confirmed published Vuttara 3.2.33 baseline.
- Validated the exact nine-file source working set and the settings/audio follow-up repair.
- Used isolated dependencies, TypeScript, baseline-versus-feature ESLint comparison and Windows x64 packaging.
- Required the exact Release Manager candidate to pass runtime installation, launch, shutdown, uninstall and cleanup testing.
- Hash-validated the installer, blockmap and latest.yml updater assets before publication.
