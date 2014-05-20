# Contributing to SlamData

It is easiest to have everyone on the same environment when building SlamData.
We use [vagrant][vagrant] to attempt to keep this as standard as possible. The box comes with the latest versions of `PureScript`, `nodejs`, `grunt` and `gulp` (among others).

You're going to need a few tools.

    * vagrant
    * virtualbox

### Installation

N.B. when we get the prebuilt box hosted, this will be much easier.

1. Clone this repo.
1. Install [vagrant][vagrant] and [virtualbox][virtualbox]. For most linux distro's these should be in your package manager.
1. At you moment you'll have to build the base box yourself. Hosting a nearly 1GB box file is not feasible at this time. Follow the directions at [purescript-vagrant][purescript-vagrant].
1. After you've provisioned that machine, [create a boxfile][create-a-box].
1. Edit the location in the `Vagrantfile` of this repo to point to your box.
1. `vagrant up` to create the box.
1. When you want to compile/test/run ssh into the box with `vagrant ssh`
1. Contribute!

[virtualbox]: https://www.virtualbox.org/
[vagrant]: http://www.vagrantup.com/
[purescript-vagrant]: https://github.com/paf31/purescript-vagrant
[vagrant-berkshelf]: http://berkshelf.com/#install_the_vagrant_berkshelf_plugin
[create-a-box]: http://docs.vagrantup.com/v2/virtualbox/boxes.html
