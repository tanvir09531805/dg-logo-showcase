import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { Demo as Demo_Icon, Doc_Link as Doc_Icon } from '../icons/icons';
import { ToggleField } from '../components/common/Fields';
import { useIsMount } from '../hooks/useIsMount';
import { storeSettings } from '../utils/utils';

const GlobalAction = ( { handleAll } ) => {
	const handleGlobalAction = ( value ) => {
		handleAll( value );
	};
	return (
		<div className="action">
			<button
				className="enable-all"
				onClick={ () => handleGlobalAction() }
			>
				{ __( 'Enable All', 'divi_flash' ) }
			</button>
			<button
				className="disable-all"
				onClick={ () => handleGlobalAction( false ) }
			>
				{ __( 'Disable All', 'divi_flash' ) }
			</button>
		</div>
	);
};
const Tooltip = ( { text } ) => <div className="tooltip">{ text }</div>;
const Anchor = ( { children, ...attr } ) => {
	const props = { target: '_blank', ...attr };
	return <a { ...props }>{ children }</a>;
};

export const Modules = () => {
	const [ modules, setModules ] = useState( diflSettings.modules );
	const modulesBycategory = Object.groupBy(
		modules,
		( { category } ) => category
	);
	const [ activeModules, setActiveModules ] = useState(
		diflSettings.active_modules
	);
	const categories = Object.keys( modulesBycategory );
	categories.unshift( 'All' );

	const [ activeCategory, setActiveCategory ] = useState( categories[0] );

	const [ search, setSearch ] = useState( '' );

	const icons = `${ diflSettings.static }module-icons/`;
	const isActiveModule = ( name ) => activeModules.includes( name );
	const handleToggle = ( module, value ) => {
		value
			? setActiveModules( ( prevModules ) => [ ...prevModules, module ] )
			: setActiveModules( () =>
				activeModules.filter( ( mod ) => mod !== module )
			);
	};

	const handleAll = ( enableAll = true ) => {
		if ( ! enableAll ) {
			setActiveModules( [] );
			return;
		}

		setActiveModules( modules.map( ( module ) => module.parent ) );
	};

	const handleOnSearch = ( value ) => {
		setSearch( value );
		setModules(
			diflSettings.modules.filter( ( module ) =>
				module.parent_name.toLowerCase().includes( value )
			)
		);
	};

	const isMount = useIsMount();

	useEffect( () => {
		if ( isMount ) return;
		storeSettings( activeModules, diflSettings.actions.modules );
	}, [ activeModules ] );

	return (
		<div className="modules">
			<div className="global-control">
				<div className="heading">
					<p className="title">Divi Modules</p>
					<p className="details">
						Use the toggle button to activate or deactivate all the
						modules of DiviFlash at once.
					</p>
				</div>
				<GlobalAction handleAll={ handleAll }/>
			</div>
			<div className="categories">
				<div className="list">
					{ categories.map( ( category ) => {
						if (
							search !== '' &&
							category !== activeCategory &&
							activeCategory !== 'All' &&
							category !== 'All'
						) {
							return;
						}
						return (
							<button
								className={
									'item ' +
									(activeCategory === category
										? 'active'
										: '')
								}
								key={ category }
								onClick={ ( e ) =>
									setActiveCategory( category )
								}
							>
								{ category }
							</button>
						);
					} ) }
				</div>
				<div className="search">
					<input
						type="text"
						value={ search }
						onChange={ ( e ) =>
							handleOnSearch( e.target.value.toLowerCase() )
						}
						placeholder={ __( 'Search for modules', 'divi_flash' ) }
					/>
				</div>
			</div>
			{ Object.keys( modulesBycategory ).map( ( category ) => {
				if (
					categories[0] !== activeCategory &&
					category !== activeCategory
				) {
					return;
				}
				return (
					<Fragment key={ category }>
						<h3 className="category-name">
							{ __( category, 'divi_flash' ) }
						</h3>
						<div className="module-card">
							{ modulesBycategory[category].map( ( module ) => {
								let parent = module.parent;
								return (
									<div className="card-item" key={ parent }>
										<div className="name">
											{ /*<div className="icon" style={{width:'35px', height:'24px', aspectRatio:'3/2'}}>*/ }
											{ /*	<ModuleIcon name={modules[name]['icon']} />*/ }
											{ /*</div>*/ }
											<img
												className="icon"
												src={ `${ icons }${
													module['icon'] + '.svg'
												}` }
												width="35px"
												height="24px"
											></img>
											<div className="name">
												{ module['parent_name'] }
											</div>
										</div>
										<div className="action">
											<div className="demo">
												<Anchor
													href={
														module['demo_link']
													}
												>
													<Demo_Icon/>
													<Tooltip
														text={ __(
															'Live Demo',
															'divi_flash'
														) }
													/>
												</Anchor>
											</div>
											<div className="doc">
												<Anchor
													href={
														module['doc_link']
													}
												>
													<Doc_Icon/>
													<Tooltip
														text={ __(
															'Document',
															'divi_flash'
														) }
													/>
												</Anchor>
											</div>
											<ToggleField
												item={ parent }
												isActive={ isActiveModule(
													parent
												) }
												toggleHandler={ handleToggle }
											/>
										</div>
									</div>
								);
							} ) }
						</div>
					</Fragment>
				);
			} ) }
		</div>
	);
};


(() => {
	window.addEventListener( 'load', () => {
		const items = document.querySelectorAll( '.modules .categories .list .item' );
		let previousTop = null;

		items.forEach( item => {
			const currentTop = item.getBoundingClientRect().top;

			if ( previousTop !== null && currentTop > previousTop ) {
				item.classList.add( 'new-row' );
			}

			previousTop = currentTop;
		} );

	} )
})()
