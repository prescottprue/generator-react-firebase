import <%= pascalEntityName %>Page from './<%= pascalEntityName %>Page';
import enhancer from './<%= pascalEntityName %>Page.enhancer'

export { enhancer, <%= pascalEntityName %>Page as component }

export default enhancer(<%= pascalEntityName %>Page);
