/**
 * Internal dependencies
 */
import { getProductTypes, getSurfacedProductKeys } from '../utils';
import { productTypes, onboardingProductTypesToSurfaced } from '../constants';

describe( 'getProductTypes', () => {
	it( 'should return the product types', () => {
		expect( getProductTypes() ).toEqual( productTypes );
	} );

	it( 'should return the product types without excluded items', () => {
		expect(
			getProductTypes( [ 'external', 'digital' ] ).map( ( p ) => p.key )
		).toEqual( [ 'physical', 'variable', 'subscription', 'grouped' ] );
	} );
} );

describe( 'getSurfacedProductKeys', () => {
	test.each( [
		{
			selectedTypes: [ 'physical' ],
			expected: onboardingProductTypesToSurfaced.physical,
		},
		{
			selectedTypes: [ 'physical', 'downloads' ],
			expected: onboardingProductTypesToSurfaced[ 'downloads,physical' ],
		},
		{
			selectedTypes: [],
			expected: productTypes.map( ( p ) => p.key ),
		},
	] )(
		'should return expected surfaced product keys when onboarding product type contains $selected',
		( { selectedTypes, expected } ) => {
			expect( getSurfacedProductKeys( selectedTypes ) ).toEqual(
				expected
			);
		}
	);
} );