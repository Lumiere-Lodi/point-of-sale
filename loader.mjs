import path from 'node:path';

export default function loadAliases(aliasesToAdd) {
  const getAliases = () => {

    // eslint-disable-next-line no-undef
    const base = process.cwd();

    const absoluteAliases = Object.keys(aliasesToAdd).reduce((acc, key) =>
      aliasesToAdd[key][0] === '/'
        ? acc
        : { ...acc, [key]: path.join(base, aliasesToAdd[key]) },
      aliasesToAdd)

    return absoluteAliases;

  }

  const isAliasInSpecifier = (path, alias) => {
    return path.indexOf(alias) === 0
      && (path.length === alias.length || path[alias.length] === '/')
  }

  const aliases = getAliases();

  return (specifier, parentModuleURL, defaultResolve) => {

    const alias = Object.keys(aliases).find((key) => isAliasInSpecifier(specifier, key));

    const newSpecifier = alias === undefined
      ? specifier
      : path.join(aliases[alias], specifier.substr(alias.length));

    return defaultResolve(newSpecifier, parentModuleURL);
  }
}

export const resolve = loadAliases({
  "@server": "./build",
  "@config": "./build/config"
});
