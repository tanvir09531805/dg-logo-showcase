import { __ } from '@wordpress/i18n';
import {
	Community,
	Documentation,
	License_Key,
	Review,
	Support,
} from '../icons/icons';
import { useState } from '@wordpress/element';
import { handleLink } from '../utils/utils';
import { DIFL_Modal } from '../components/common/Modal';

const Card = (
	{ slug, icon, title, description, button_text },
	key,
	handleLink
) => {
	return (
		<div className="difl-card card" key={ key }>
			{ icon }
			<p className="title">{ title }</p>
			<p className="description">{ description }</p>
			<button className="button" onClick={ () => handleLink( slug ) }>
				{ button_text }
			</button>
		</div>
	);
};

export const Welcome = () => {
	const [ showModal, setShowModal ] = useState( false );
	const cards = [
		{
			slug: 'support',
			title: __( 'Need Support?', 'divi_flash' ),
			icon: <Support />,
			description:
				"Team DiviFlash is happy to help! Feel free to reach out with any questions or concerns related to our product. We're committed to responding to all support requests within 2-3 hours.",
			button_text: __( "Let's Chat", 'divi_flash' ),
		},
		{
			slug: 'doc',
			title: __( 'Knowledge Base', 'divi_flash' ),
			icon: <Documentation />,
			description:
				'Require assistance while working with DiviFlash? Explore our comprehensive documentation, reference materials, and tutorials for DiviFlash.',
			button_text: __( 'View All Documentation', 'divi_flash' ),
		},
		{
			slug: 'community',
			title: __( 'Join the Community', 'divi_flash' ),
			icon: <Community />,
			description:
				'Whether you have a question about the plugin, want to share your awesome project, or just drop a friendly hi, our wonderful community awaits!.',
			button_text: __( 'Join Now', 'divi_flash' ),
		},
	];
	const handleModal = () => {
		setShowModal( true );
	};
	const poster = `${ diflSettings.static }hero-video-poster.webp`;

	const licensePage = async () => {
		await document.querySelector( '.settings-page' ).click();
		await document.querySelector( '#settings' ).click();
	};
	return (
		<>
			{ showModal && (
				<DIFL_Modal
					setShowModal={ setShowModal }
					className="diviflash-modal video-modal"
					shouldCloseOnClickOutside={ false }
				>
					<iframe
						width="900"
						height="510"
						src="https://www.youtube.com/embed/Ls8eTS_-Xak?si=VbYnyIqhtWppPxTG"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						loading={ 'eager' }
					></iframe>
				</DIFL_Modal>
			) }
			<div className="welcome">
				<div className="hero">
					<div className="content">
						<h1>Welcome to DiviFlash!</h1>
						<p>
							DiviFlash is the most advanced Divi plugin, which
							enhances your website building capabilities with
							powerful Divi modules, extensions and premade
							layouts.
						</p>
						{ 'https://www.diviflash.com' ===
							diflSettings.update_uri && (
							<div className="license-btn">
								<button onClick={ licensePage }>
									<License_Key />
									<p>
										{ __(
											'Enter your Product Key',
											'divi_flash'
										) }
									</p>
								</button>
							</div>
						) }
					</div>
					<div
						className="video"
						style={ {
							backgroundImage: `url(${ poster })`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
						} }
					>
						<div
							className="play-icon"
							onClick={ handleModal }
						></div>
					</div>
				</div>
				<div className="card-container">
					{ cards.map( ( card, key ) =>
						Card( card, key, handleLink )
					) }
				</div>
				<div className="rating">
					<div className="icon">
						<Review />
					</div>
					<p className="heading">Rate Us</p>
					<p className="description">
						Your feedback matters! We love to hear from you, and
						every single review is appreciated.
					</p>
					<div
						className="cta"
						onClick={ () => handleLink( 'review' ) }
					>
						{ __( 'Share Your Experience', 'divi_flash' ) }
					</div>
				</div>
			</div>
		</>
	);
};
