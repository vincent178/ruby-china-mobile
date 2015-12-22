

// Read collapsed positions
this.collectProperties_(this.collapsedPostiions_);

// Expand the card and read again.
this.elements_.root.classList.add('card--expanded');
this.collectProperties_(this.expandedPositions_);

// Figure out the difference and transform back.
this.calculatePositionDiffs_();
this.setElementTransformsToStartAndClipToCollapsed_();

// Read to force the style change to take hold.
var wowSuchForcedLayoutManyRead = this.elements_.root.offsetTop;

// Switch on animations and remove the transforms.
this.elements_.root.classList.add('card--animatable');
this.setElementTransformsToZeroAndClipToExpanded_();




