<?php Section::inject('page_title', 'New Company') ?>
<form id="new-vendor-form" action="<?php echo Jade\Dumper::_text(route('vendors')); ?>" method="POST">
  <?php echo Jade\Dumper::_html(View::make('users.account_vendor_fields')->with('vendor', Input::old('vendor'))->with('user', Input::old('user'))->with('services', Input::old('services'))->with('signup', true)); ?>
  <div class="form-actions">
    <div class="control-group form-inline">
      <label>How did you hear about RFP-EZ?</label>
      <input class="input-xlarge" type="text" name="user[how_hear]" value="" />
    </div>
    <button class="btn btn-primary" type="submit">Create Profile</button>
  </div>
</form>