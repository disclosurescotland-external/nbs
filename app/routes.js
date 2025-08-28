//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// ----------------------------------------------










// Apply settings across this whole prototype
router.get('*', function(req, res, next){
    // Set the service name
    res.locals['serviceName'] = 'Consider List Appeal'



{/* <div class="ds_phase-banner">
    <div class="ds_wrapper">
        <p class="ds_phase-banner__content">
             <strong class="ds_tag  ds_phase-banner__tag">
                 alpha
             </strong>
                 <span class="ds_phase-banner__text">
                    This is a new service. Your <a href="#">feedback</a> will help us to improve it.
                </span>
        </p>
    </div>
</div> */}
    

    // Show the sign out link
    res.locals['signedin'] = true

    // Add main nav items
    res.locals['siteNav'] = [
        {
            name: "S + U"
        },
        {
            name: "CLA"
        },
        {
            name: "Applications"
        },
        {
            name: "Help"
        },
        {
            name: "Sign out"
        }
    ]


    next()
})

// Setup a var to activate the active state in the site menu
router.get('/:level1/*', function(req, res, next){
    res.locals.navActive = req.params.level1
    next()
})

// Return check your answers links back to the CYA page
// Usage: <a href="applicant?cya=true"…
router.post('*', function(req, res, next){
    if (req.session.data['cya']) {
        delete req.session.data['cya']
        res.redirect('check-answers');
    } 
    else { next() }
})

// Go back to the changelog page on home link
router.get('/', function(req, res, next){
    res.redirect('/manage-prototype')
})

router.post('/applications/information', function (req, res) {
    if (req.session.data['appealing'] == 'Yes') {
        res.redirect('task-list');
    } else {
        res.redirect('result');
    }
})



router.post('/applications/0-3-convictions-router', function (req, res) {
    if (req.session.data['review'] == 'No') {
        res.redirect('0-3a-exit');
    } else {
        res.redirect('0-4-more-information');
    }
})

router.post('/applications/0-5-more-information-router', function (req, res) {
    if (req.session.data['personal-statement'] == 'No') {
        res.redirect('0-5a-review-requested');
    } else {
        res.redirect('0-8-about-you');
    }
})

router.post('/applications/xx', function(req, res, next){
    res.redirect('confirmation')
})

router.post('/applications/_result-expt-pages-share', function(req, res, next){
    res.redirect('how-to-share-holding')
})

router.post('/applications/0-10-thanks-router', function(req, res, next){
    res.redirect('newDash')
})
// router.post('/applications/0-5a-review-requested', function(req, res, next){
//  res.redirect('confirmation')
// })


// Add your routes above the module.exports line
module.exports = router


























// --------------------------------------------------------
// Logging session data 
// This displays all your session data in your terminal - useful for debugging the prototype
router.use((req, res, next) => { 
	const log = { 
	method: req.method, 
	url: req.originalUrl, 
	data: req.session.data 
	} 
	console.log(JSON.stringify(log, null, 2)) 
	next() 
	})