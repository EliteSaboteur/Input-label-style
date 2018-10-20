$(document).ready(function () {

    /*
     =====================================
     Helper functions
     =====================================
     */
    function addLabelFor($label, id) {
        /*
         sets @tag attribute 'for= @id'
         */
        if (typeof $label.attr('for') == typeof undefined || $label.attr('for') == false) {
            $label.attr('for', id);
        }
    }

    function switchStatus($label){
        /*
        switches checkbox from checked to unchecked
        @tag - label to be switched
         */
        if ($label.hasClass('checked')) {
            $label.removeClass('checked');
        } else {
            $label.addClass('checked');
        }
    }

    /*
     =====================================
     For input inside label
     =====================================
     */
    function inputInsideLabel($currentInput, id) {
        /*
         Methods for input inside label.
         */
        addLabelFor($currentInput.parent(), id);
    }

    /*
     =====================================
     For input outside label
     =====================================
     */
    function inputOutsideLabel($currentInput, id) {
        /*
         Check if input is before or after label in markup
         */
        $firstSibling = $currentInput.siblings('label').first();
        addLabelFor($firstSibling, id);
    }

    /*
     =====================================
     Id and Label controllers
     =====================================
     */
    function validateId($currentInput, index) {
        /*
         check if input has id else create one
         params: @currentInput current input,
         @index counter for the creation of an unique id
         return id value
         */
        if (!$currentInput[0]['id']) {
            $currentInput.attr('id', 'pretty-id-' + index);
            return 'pretty-id-' + index;
        } else {
            return $currentInput[0]['id'];
        }
    }

    function validateLabel($currentInput, id) {
        /*
         Check if input is inside or outside the label
         Params: $currentInput - current input
         */
        var parentTag = $currentInput.parent().get(0).tagName;
        if (parentTag == 'LABEL') {
            inputInsideLabel($currentInput, id);
        } else {
            inputOutsideLabel($currentInput, id);
        }
    }

    /*
     ====================================
     Main function
     ====================================
     */
    $('input[type=checkbox]').each(function (index) {
        inputId = validateId($(this), index);
        validateLabel($(this), inputId);
    });
    /*
     ************************************
     On Click trigger
     ************************************
     */
    /*
     ====================================
     Main Click trigger function
     ====================================
     */
    $('input[type=checkbox]').click(function () {
        inputInsideLabelTrigger($(this));
        inputOutsideLabelTrigger($(this));
    });
    /*
     ====================================
     Label changes functions
     ====================================
     */
    function inputInsideLabelTrigger($input) {
        var parentTag = $input.parent().get(0).tagName;
        if (parentTag == 'LABEL') {
            switchStatus($input.parent());
        }
    }

    function inputOutsideLabelTrigger($input) {
        $firstSibling = $input.siblings('label').first();
        switchStatus($firstSibling);
    }

});
